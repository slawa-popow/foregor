import dotenv from 'dotenv';
import axios from "axios";
import { ExportOprihod, InfoSizeQuery, PathNamePlitochka, QueryProducts, ResponseQueryMySklad, TypeJoinOprihod } from '../types/TypesMySklad';
import fs from 'fs';
 

dotenv.config();

// const TOKENFILE = __dirname + '..//..//..//' + 'token.json';                     // dev
const TOKENFILE = '/home/p/pavel7rk/pavel7rk.beget.tech/forEgorApp/token.json'      // prod

function getTokenMySklad() {
    const rawtoken = fs.readFileSync(TOKENFILE, {encoding: 'utf-8'}); 
    const objtoken = JSON.parse(rawtoken) as {token: string};
    process.env.MOISKLAD_TOKEN = objtoken.token; 
}

function setTokenMySklad(token: string) {
    const newToken = {token: token};
    fs.writeFile (TOKENFILE, JSON.stringify(newToken), 'utf-8', async function(err) {
        if (err) throw err;
        console.log('complete');
        getTokenMySklad();
        }
    );
}

getTokenMySklad();


const headersGetToken = (credential: string) => {
    return {'User-Agent': 'Plitochka.by client', 'Accept': '*/*', 'Content-Type': "application/json",
        'Content-Encoding': 'gzip, deflate, br', 'Connection': 'keep-alive',
        'Authorization': `Basic ${credential}` }
}

const aheaders = (token: string) => {
    return {'User-Agent': 'Plitochka.by client', 'Accept': '*/*', 'Content-Type': "application/json",
                       'Content-Encoding': 'gzip, deflate, br', 'Connection': 'keep-alive',
                       'Authorization': `Bearer ${token}`, }
};

class MySklad {

    private token: string = process.env.MOISKLAD_TOKEN || '';

    pathes = {
        stockFilterProduct: 'https://online.moysklad.ru/api/remap/1.2/report/stock/all?filter=product=',
        productFolder: 'https://online.moysklad.ru/api/remap/1.2/entity/productfolder',
        product: 'https://online.moysklad.ru/api/remap/1.2/entity/product?limit=100',
        productFilterPathName: 'https://online.moysklad.ru/api/remap/1.2/entity/product?filter=pathName=',
        exportOprihod: 'https://online.moysklad.ru/api/remap/1.2/entity/enter',
        getMetaAssortment: 'https://online.moysklad.ru/api/remap/1.2/entity/product?filter=id=',
        refreshToken: 'https://online.moysklad.ru/api/remap/1.2/security/token',
    };

    

    constructor() {
        
    };


    async refreshAccessToken(encode: string) {
        try {
            const h = headersGetToken(encode);
            const result  = await axios.post(this.pathes.refreshToken,{}, { headers: h});
            const newToken = result.data;
            if (newToken && newToken.access_token) {
                setTokenMySklad(newToken.access_token);
                this.token = newToken.access_token;
        
                return newToken.access_token;
            }

        } catch (err) { console.log(`Error -> MySklad->refreshAccessToken() try/catch `, err); } 
        return null;
    }

    async getAllProductFolders(): Promise<PathNamePlitochka[]> {
        try {
            const result  = await axios.get(this.pathes.productFolder, { headers: aheaders(this.token) },);
            const resultData: ResponseQueryMySklad<PathNamePlitochka> = result.data;
            
            return resultData.rows;
    
        } catch (err) { console.log(`Error -> MySklad->getAllBalanceReport() try/catch `, err); } 
        return [];
    }

    async getCountOnStock(id: string): Promise<number> {
        try {
            const result  = await axios.get(this.pathes.stockFilterProduct + id, { headers: aheaders(this.token) },);
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
            const result  = await axios.get(this.pathes.productFilterPathName + uri, { headers: aheaders(this.token) },);
            const resultData: ResponseQueryMySklad<T> = result.data;
            
            return resultData.rows;
    
        } catch (err) { console.log(`Error -> MySklad->getProductByCatsFromSklad() try/catch `, err); }
        return [];
    }


    async getAllProduct<T>(href: string | null = null): Promise<QueryProducts<T>> {
        try { 
            const url = (!href) ? this.pathes.product : href;
            
            const result  = await axios.get(url, { headers: aheaders(this.token) },);
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
                const _getMetas = await axios.get(this.pathes.getMetaAssortment + val.pid, { headers: aheaders(this.token) },);
                const getMetas = _getMetas.data as ResponseQueryMySklad<any>;
                const rows = getMetas.rows;
                if (Array.isArray(rows) && rows.length > 0) {
                const meta = getMetas.rows[0].meta;
                const sprices = rows[0].salePrices;
                let valuePrice = 0.0;
                if (Array.isArray(sprices) && sprices.length > 0) {
                    valuePrice = +sprices[0].value;
                }
                
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
            
            const result  = await axios.post(this.pathes.exportOprihod, arrMetas, { headers: aheaders(this.token) }); 
            const resultData = result.data;
            console.log(resultData);
            return true;
    
        } catch (err) { console.log(`Error -> MySklad->oprihod() try/catch `, err); }
        

        return false;
    }


}



export const mySklad = new MySklad();

 