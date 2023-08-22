import dotenv from 'dotenv';
import axios from "axios";
import { PathNamePlitochka, ResponseQueryMySklad } from '../types/TypesMySklad';


dotenv.config();



class MySklad {

    private token: string = process.env.MOISKLAD_TOKEN || '';

    private headers = {'User-Agent': 'Plitochka.by client', 'Accept': '*/*', 
                       'Content-Encoding': 'gzip, deflate, br', 'Connection': 'keep-alive',
                       'Authorization': `Bearer ${this.token}`, }

    private pathes = {
        stockFilterProduct: 'https://online.moysklad.ru/api/remap/1.2/report/stock/all?filter=product=',
        productFolder: 'https://online.moysklad.ru/api/remap/1.2/entity/productfolder',
        product: 'https://online.moysklad.ru/api/remap/1.2/entity/product',
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

}

export const mySklad = new MySklad()