import dotenv from 'dotenv';
import axios from "axios";
import { ExportOprihod, InfoSizeQuery, PathNamePlitochka, QueryProducts, ResponseQueryMySklad, TypeJoinOprihod } from '../types/TypesMySklad';

dotenv.config();


class MySklad {

    private token: string = process.env.MOISKLAD_TOKEN || '';

    private headers = {'User-Agent': 'Plitochka.by client', 'Accept': '*/*', 'Content-Type': "application/json",
                       'Content-Encoding': 'gzip, deflate, br', 'Connection': 'keep-alive',
                       'Authorization': `Bearer ${this.token}`, }

    pathes = {
        stockFilterProduct: 'https://online.moysklad.ru/api/remap/1.2/report/stock/all?filter=product=',
        productFolder: 'https://online.moysklad.ru/api/remap/1.2/entity/productfolder',
        product: 'https://online.moysklad.ru/api/remap/1.2/entity/product?limit=100',
        productFilterPathName: 'https://online.moysklad.ru/api/remap/1.2/entity/product?filter=pathName=',
        exportOprihod: 'https://online.moysklad.ru/api/remap/1.2/entity/enter',
        getMetaAssortment: 'https://online.moysklad.ru/api/remap/1.2/entity/product?filter=id='
    };

    constructor() {};

    async getAllProductFolders(): Promise<PathNamePlitochka[]> {
        try {
            const result  = await axios.get(this.pathes.productFolder, { headers: this.headers },);
            const resultData: ResponseQueryMySklad<PathNamePlitochka> = result.data;
            
            return resultData.rows;
    
        } catch (err) { console.log(`Error -> MySklad->getAllBalanceReport() try/catch `, err); }
        return [];
    }

    async getCountOnStock(id: string): Promise<number> {
        try {
            const result  = await axios.get(this.pathes.stockFilterProduct + id, { headers: this.headers },);
            const resultData = result.data;
            
            const resultStock = resultData.rows;
            if (resultStock && Array.isArray(resultStock) && resultStock.length > 0) {
                return resultStock[0]['stock'];
            }
    
        } catch (err) { console.log(`Error -> MySklad->getCountOnStock() try/catch `); }
        return 0;
    }


    async getProductByCatsFromSklad<T>(uri: string): Promise<T[]> {
        try {
            const result  = await axios.get(this.pathes.productFilterPathName + uri, { headers: this.headers },);
            const resultData: ResponseQueryMySklad<T> = result.data;
            
            return resultData.rows;
    
        } catch (err) { console.log(`Error -> MySklad->getProductByCatsFromSklad() try/catch `, err); }
        return [];
    }


    async getAllProduct<T>(href: string | null = null): Promise<QueryProducts<T>> {
        try { 
            const url = (!href) ? this.pathes.product : href;
            
            const result  = await axios.get(url, { headers: this.headers },);
            const resultData: ResponseQueryMySklad<T> = result.data; 
            const sizeData: InfoSizeQuery = {
                size: resultData.meta.size || null,
                limit: resultData.meta.limit || null,
                offset: resultData.meta.offset || 0,
                nextHref: resultData.meta.nextHref || null,
                previousHref: resultData.meta.previousHref || null
            };
            const returnResult: QueryProducts<T> = {sizeData: sizeData, rows: resultData.rows};
            return returnResult;
    
        } catch (err) { console.log(`Error -> MySklad->getAllProduct() try/catch `, err); }
        return {sizeData: null, rows: []}; 
    }


    // Оприходовать
    async oprihod(arrIds: TypeJoinOprihod[]): Promise<boolean> {
        try {
            const arrMetas: ExportOprihod[] = [];
            for (let val of arrIds) {
                const _getMetas = await axios.get(this.pathes.getMetaAssortment + val.pid, { headers: this.headers },);
                const getMetas = _getMetas.data as ResponseQueryMySklad<any>;
                const rows = getMetas.rows;
                if (Array.isArray(rows) && rows.length > 0) {
                const meta = getMetas.rows[0].meta;
                const sprices = rows[0].salePrices;
                let valuePrice = 0.0;
                if (Array.isArray(sprices) && sprices.length > 0) {
                    valuePrice = +sprices[0].value;
                }
                console.log(sprices)
                const obj: ExportOprihod = {
                    organization: {
                    meta: {
                          href: "https://online.moysklad.ru/api/remap/1.2/entity/organization/831552fb-1cc9-11ea-0a80-04b10005f63c",
                          metadataHref: "https://online.moysklad.ru/api/remap/1.2/entity/organization/metadata",
                          type: "organization",
                          mediaType: "application/json"
                        }
                    },
                    store: {
                        meta: {
                          href: "https://online.moysklad.ru/api/remap/1.2/entity/store/83167117-1cc9-11ea-0a80-04b10005f63e",
                          metadataHref: "https://online.moysklad.ru/api/remap/1.2/entity/store/metadata",
                          type: "store",
                          mediaType: "application/json"
                        }
                    },
                    description: val.name + ' ' + val.color + ' ' + val.article,
                    positions: [
                        {
                            quantity: val.count || 0,
                            price: valuePrice,   
                            assortment: {  
                                meta: meta
                            }
                        }
                    ]
                }; // end_obj
                arrMetas.push(obj);
            }
            } // end_for
            
            const result  = await axios.post(this.pathes.exportOprihod, arrMetas, { headers: this.headers}); 
            const resultData = result.data;
            console.log(resultData);
            return true;
    
        } catch (err) { console.log(`Error -> MySklad->oprihod() try/catch `, err); }
        

        return false;
    }


}

export const mySklad = new MySklad()