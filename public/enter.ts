import { TelegramWebApps } from 'telegram-webapps-types';
import { HOST, appcn } from './src/AppConnect';


declare const window: {
    Telegram: TelegramWebApps.SDK;
  } & Window;

window.Telegram.WebApp.ready();
window.Telegram.WebApp.expand();

(async () => {
    const initData = Telegram.WebApp.initDataUnsafe || {};
    const respdata = await appcn.sendTelegramData(initData) as {status: number, href: string}; 
    if (respdata.status > 0) {
        window.location.href = HOST + respdata.href;
    } 

})();
