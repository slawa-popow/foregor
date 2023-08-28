

const DEVHOST = '/';
const HOST = DEVHOST;

export class AppConnect {

    host = '/';
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

    async getProductByCats(url: string, uri: string) {
        const requestData = {URISklad: uri};
        const resp = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(requestData)
        });
        const result = await resp.json();
        return result;
    }
}


export const appcn = new AppConnect(HOST);