import { Request, Response } from 'express';
import { Table, db } from '../database/MySqlAgent';
import { mySklad } from '../mysklad/MySklad';
import { MinimizeResponseListProds, PathNamePlitochka, ProductsByPathCats, QueryProducts } from '../types/TypesMySklad';
import { createPathForGetProdList, getMinimizeListProds, getPatchesToProductList, preparedDataToWrite } from '../utils/funcs';
import { myValidationResult } from '../customErrors/customErrField';
import { DoOprihod, TypeInputFormOprihod } from '../types/TypeInputFormOprihod';
import { MRequest, Teledata } from '../types/TypesApp';
import reader, { utils } from 'xlsx';


class MainController {

    async getIndexPage(_request: Request, response: Response) {
        return response.status(200).render('enterA', {
            layout: 'authA', }); 
    }

    async getWorkPage(request: Request, response: Response) {
        if (request.session && request.session.auth) {
            const name = request.session.auth.name;
            const id = request.session.auth.id;
            return response.status(200).render('indexA', {
                layout: 'mainA', 
                data: {
                    name: name,
                    id: id,
                    currTime: new Date().toLocaleString("ru-RU", {timeZone: "Europe/Moscow"})
                }
            }); 
        }
        return response.status(404).send("Доступ запрещен.");
    }


    // получить данные телеграм
   
    async fromTelegram(request: Request, response: Response) { 
        const teleData = request.body as Teledata;

        if (request.session && teleData && Object.keys(teleData).length > 0 
            && teleData.user && teleData.user.id) {
            const usid = '' + teleData.user.id;
            const result = await db.checkIdUser(usid);
            if (result.length > 0) {
                const [name, tgid] = result;
                const authStatus = {status: 200, href: 'work'};
                request.session.auth = {name: name, id: tgid};
                return response.status(200).json(authStatus);
            }
        }
        return response.status(400).json({status: 0, href: ''});
        
    }


    
    async getAllProdFolder(_request: Request, response: Response) {
        const productFolders: PathNamePlitochka[] = await mySklad.getAllProductFolders();
        const arrPathName = await getPatchesToProductList(productFolders);
        const arrPathes = await createPathForGetProdList(arrPathName);
        
        return response.status(200).json(arrPathes);
    }


    async getProductByCats(request: Request, response: Response) {
        const errors = myValidationResult(request);
         
        if (!errors.isEmpty()) {
            return response.status(400).json( { errors: errors.array({onlyFirstError: true}) } );
        } 
        const uriData = request.body.URISklad;
        const resultSklad: ProductsByPathCats[] = await mySklad.getProductByCatsFromSklad<ProductsByPathCats>(uriData);
        
        const responseResult: MinimizeResponseListProds[] = await getMinimizeListProds(resultSklad);
        
        return response.status(200).json(responseResult);
    }


    /**
     * Unique namePath list
     */
    async getUniqPathes(_request: Request, response: Response) {
        const unpaths = await db.getUniqPathes();
        return response.status(200).json(unpaths);
    }


    /**
     * 
     * Форма оприходования для записи в таблицу бд.
     * Вернуть всю таблицу.
     */
    async formDataOprihod(request: MRequest, response: Response) {
        const errors = myValidationResult(request);
         
        if (!errors.isEmpty()) {
            return response.status(400).json( [{ errors: errors.array({onlyFirstError: true}) }] );
        } 
        const bdata = request.body;
        const indata: TypeInputFormOprihod = bdata;
        indata.photoPath = request.photoPath;
        const result = await db.addProductToTableOprihod(indata);

        return response.status(200).json(result); 
    }


    /**
     * Отдать таблицу оприходований 
     */
    async getTableOprihod(_request: Request, response: Response) {
        const table = await db.getAllDataTable(Table.OneOprihod);
        response.status(200).json(table);
    }


    /**
     * Оприходовать
     */
    async doOprihod(request: Request, response: Response) {
        const indata: DoOprihod = request.body;
        console.log(indata)
        if (!indata) {
            return response.status(400).json([]);
        }
        const resultOprihod = await db.doOprihod(indata.isSendSklad);
        return response.status(200).json([indata, resultOprihod]);
    }


    // отдать все оприходования эксэль файлом
    async downloadEXELoprihod(_request: Request, response: Response) {
        const alldata = await db.getAllDataTable<TypeInputFormOprihod>(Table.Oprihod);
        const filename = './uploads/allOprihods.xlsx';
        
        const ws = reader.utils.json_to_sheet(alldata);
        const wb = reader.utils.book_new();
        utils.book_append_sheet(wb, ws, "Все оприходования");
        reader.writeFile(wb, filename);
        
        return response.download(filename);
    }


    /**
     * {delId: idrow}
     */
    async deleteRow(request: Request, response: Response) {
        const errors = myValidationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json( { errors: errors.array({onlyFirstError: true}) } );
        } 
        const rowId = request.body.delId;
         
        const resultDel = await db.delRowById(rowId);
        return response.status(200).json(resultDel);
    }


    /**
     * 
     * Получить атрибуты (имя, цвет) по присланному uri pathName мойсклад 
     */
    async getAttrsByPath(request: Request, response: Response) {
        const errors = myValidationResult(request);
         
        if (!errors.isEmpty()) {
            return response.status(400).json( { errors: errors.array() } );
        } 
        const bodydata = request.body.pathName;
        const findResult = await db.getAttributesByPathName(bodydata);
        if (findResult) 
            return response.status(200).json([findResult]);
        return response.status(404).json({ errors: ["not found"] });
    }


    /**
     * Выбрать данные о всех продуктах из МойСклад и записать в бд
     */
    async getAllProdFromMySkladAndWriteToDb(_request: Request, response: Response) {
    
        let nexthref: string | null | undefined = mySklad.pathes.product;

            while (nexthref) {
        
                let limRes: QueryProducts<ProductsByPathCats> = await mySklad.getAllProduct<ProductsByPathCats>(nexthref);
                nexthref = limRes.sizeData!.nextHref;
                
                const prepDataArr = preparedDataToWrite(limRes.rows);
                for (let sqlRows of prepDataArr) {
                    const boolOprt = db.writeAllProducts(sqlRows);
                    if (!boolOprt)
                        return response.status(400).json({result: 'error'});
                }
            
            }
        return response.status(200).json({result: 'ok'});
        
    }

    // ----------------------- test db --------------------------

    async postTestDb(_request: Request, response: Response) {
        
        for (let i = 0; i < 10000; i++) {
            await db.setTestData([`Slava`, `${i}`]); 
        }
        return response.status(200).json({status: 'end'});
    }

}


export const mainController = new MainController();