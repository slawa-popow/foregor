import { TelegramWebApps } from "telegram-webapps-types";
import { DoOprihod, RefreshTokenData, TypeInputOprihod } from "./types/TypesFrontend";

// const DEVHOST = 'https://foregor.vercel.app/';
const DEVHOST = 'https://kitopt24.site/';
// const DEVHOST = '/';
export const HOST = DEVHOST;


export class AppConnect {

    host = HOST;
    constructor(host: string) {
        this.host = host;
    }

    getLinkDownloadExcell(): string {
        return this.host + 'getOprihodsExcel';
    }

    async getProdFolders(url: string) {
        const resp = await fetch(this.host + url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8' 
            },
            body: JSON.stringify({})
        });
        return await resp.json();
    }


    async getExcelFile() {
        try {
            const resp = await fetch(this.host + 'getOprihodsExcel', {method: 'GET'});
            return await resp.blob();
        } catch (e) { console.log('error AppConnect -> getExcelFile()') } 
        return null;    
    }

    // получить товары по pathName
    async getProductByCats(url: string, uri: string) {
        const requestData = {URISklad: uri};
        const resp = await fetch(this.host+url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(requestData)
        });
        const result = await resp.json();
        return result;
    }

    // отправить форму оприход
    async getRespSendFormDataOprihod(formData: FormData) {
        const response = await fetch(this.host + 'formOprihod', {
            method: 'POST',
            body: formData
        });
        const result = await response.json();
        
        return result;
    }


    // перезаписать таблицу дб products 
    async rewriteProductsTable() {
        const resp = await fetch(this.host + 'writeFromMyskladToDb', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({})
        });
        const result = await resp.json() as {result: string};
        return result;
    }


    // сменить токен
    async sendRefreshToken(sendData: RefreshTokenData): Promise<RefreshTokenData> {
        const response = await fetch(this.host + 'refreshTokenSklad', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
              },
              body: JSON.stringify(sendData)
        });
        const result = await response.json();
        return result;
    }


    // Кнопка оприходовать
    async doOprihod(data: DoOprihod) {
        const response = await fetch(this.host + 'doOprihod', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
              },
              body: JSON.stringify(data)
        });
        const result = await response.json();
        
        return result;
    }

    // получить таблицу добавленных продуктов
    async getTableOprihod(): Promise<TypeInputOprihod> {
        const response = await fetch(this.host + 'getTableOprihod', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
              },
              body: JSON.stringify({})
        });
        const result = await response.json();
        return result;
    }


    async deleteRow<T>(idrow: string): Promise<T> {
        const response = await fetch(this.host + 'deleteRow', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
              },
              body: JSON.stringify({delId: idrow})
        });
        const result = await response.json();
        return result;
    }


    // получить списки цвет и название по pathName для select-ов
    async getAttributesNameColorsByPathName(pathName: string) {
        const reqData = {pathName: pathName};
        const resp = await fetch(this.host + 'getAttrsByPath', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(reqData)
        });
        const result = await resp.json();
        return result;
    }

    // отправка на сервер данных от телеграм /////тест
    async sendTelegramData(data: TelegramWebApps.WebAppInitData) {
        const resp = await fetch(this.host + 'fromTelegram', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        });
        const result = await resp.json();
        return result;
    }
}


export const appcn = new AppConnect(HOST);