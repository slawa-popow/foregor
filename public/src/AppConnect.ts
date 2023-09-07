import { DoOprihod, TypeInputOprihod } from "./types/TypesFrontend";

const DEVHOST = 'https://foregor.vercel.app/';
// const DEVHOST = '/';
const HOST = DEVHOST;


export class AppConnect {

    host = HOST;
    constructor(host: string) {
        this.host = host;
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
}


export const appcn = new AppConnect(HOST);