import { TelegramWebApps } from 'telegram-webapps-types';
import { HOST, appcn } from './src/AppConnect';


///////////////////////////////////////////////////


// const teledata =  {
//         query_id: 'AAHrOrtzAAAAAOs6u3MMOL44',
//         user: {
//           id: 1941650155,
//           first_name: 'Slava',
//           last_name: '',
//           username: 'Pwg90',
//           language_code: 'ru',
//           allows_write_to_pm: true,
//           is_bot: true
//         },
//         auth_date: 1694156804,
//         hash: 'edf8278eebeb8f35e9d7e162afaf7038743be156699cc05b62e6c02d49f05e92'
//       }


/////////////////////////////////////////////////////

declare const window: {
    Telegram: TelegramWebApps.SDK;
  } & Window;

window.Telegram.WebApp.ready();
window.Telegram.WebApp.expand();

(async () => {
    // const initData = teledata;
    const initData = Telegram.WebApp.initDataUnsafe || {};
    const respdata = await appcn.sendTelegramData(initData) as {status: number, href: string}; 
    if (respdata.status > 0) {
        window.location.href = HOST + respdata.href;
    } else {
        const henter = document.getElementById('henter');
        const pwait = document.getElementById('pwait');
        henter!.textContent = "Доступ запрещен.";
        pwait!.textContent = "Войдите через телеграм-бот.";
    }

})();

