

const DEVHOST = '/';
const HOST = DEVHOST;

class AppConnect {

    host = '/';
    constructor(host) {
        this.host = host;
    }

    async getProdFolders(url) {
        const resp = await fetch(this.host + url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({})
        });
        return await resp.json();
    }

    async getProductByCats(url, uri) {
        const requestData = {URISklad: uri};
        const resp = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(requestData)
        });
        const result = await resp.json();
        console.log(result);
    }
}


export const appcn = new AppConnect(HOST);