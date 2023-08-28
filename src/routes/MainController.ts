import { Request, Response } from 'express';
import { db } from '../database/MySqlAgent';
import { mySklad } from '../mysklad/MySklad';
import { MinimizeResponseListProds, PathNamePlitochka, ProductsByPathCats, QueryProducts } from '../types/TypesMySklad';
import { createPathForGetProdList, getMinimizeListProds, getPatchesToProductList, preparedDataToWrite } from '../utils/funcs';
import { myValidationResult } from '../customErrors/customErrField';

class MainController {

    async getIndexPage(_request: Request, response: Response) {
        return response.status(200).render('index', {layout: 'main'}); 
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