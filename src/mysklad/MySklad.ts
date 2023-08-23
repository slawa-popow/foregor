import dotenv from 'dotenv';
import axios from "axios";
import { InfoSizeQuery, PathNamePlitochka, QueryProducts, ResponseQueryMySklad } from '../types/TypesMySklad';


dotenv.config();



class MySklad {

    private token: string = process.env.MOISKLAD_TOKEN || '';

    private headers = {'User-Agent': 'Plitochka.by client', 'Accept': '*/*', 
                       'Content-Encoding': 'gzip, deflate, br', 'Connection': 'keep-alive',
                       'Authorization': `Bearer ${this.token}`, }

    pathes = {
        stockFilterProduct: 'https://online.moysklad.ru/api/remap/1.2/report/stock/all?filter=product=',
        productFolder: 'https://online.moysklad.ru/api/remap/1.2/entity/productfolder',
        product: 'https://online.moysklad.ru/api/remap/1.2/entity/product?limit=100',
        productFilterPathName: 'https://online.moysklad.ru/api/remap/1.2/entity/product?filter=pathName='
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
            let result;
            if (!href) {
                result  = await axios.get(this.pathes.product, { headers: this.headers },);
            } else {
                result  = await axios.get(href, { headers: this.headers },);
            }
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

}

export const mySklad = new MySklad()