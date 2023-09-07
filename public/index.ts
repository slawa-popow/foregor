
import { appcn } from "./src/AppConnect";
import { Holder, ResultHolder } from "./src/ResultHolder.ts/ResultHolder";
import { GetAllFromTableOprihod } from "./src/concreteCommands/GetAllFromTableOprihod";
import { GetAllProductFolder } from "./src/concreteCommands/GetAllProductFolder";
import { Oprihod } from "./src/concreteCommands/Oprihod";
import { dom } from "./src/dom"; 
import { invoker } from "./src/invoke/Invoker";
import { AllDataTableOprihod, AnswerOprihod, FillSelectPathNames, TableProducts } from "./src/page/clients";
import { EnumPageName } from "./src/types/EnumPageName";
import { TelegramWebApps } from 'telegram-webapps-types';


declare const window: {
    Telegram: TelegramWebApps.SDK;
  } & Window;


window.Telegram.WebApp.ready();
window.Telegram.WebApp.expand();
const initData = Telegram.WebApp.initData || '';
appcn.sendTelegramData(initData); 

const datep = document.getElementById('currenttime');
setInterval( () => {
    if (datep)
        datep.textContent = 'Таблица оприходования ' + 
                new Date().toLocaleString("ru-RU", {timeZone: "Europe/Moscow"});
}, 1000);

(() =>{
    const inputCount = document.getElementById("sel-count");
    if (inputCount) {
        inputCount.addEventListener("keyup", function() {
            const input = <HTMLInputElement>this;
            input.value = input.value.replace(/[^\d]/g, "");
            if (input.value.length > 7) {
                const chank = [...input.value].slice(0, 6);
                input.value = chank.join('');
            }
            
        });
    }

})();


const idContainerCats = 'div-categories';
const cntAllprd = document.getElementById('li-menu-allprod');
const cntOprihod = document.getElementById('li-menu-oprihod');

const sendFormOprihodButton = document.getElementById('input-product');
sendFormOprihodButton?.addEventListener('click', dom.clbSendFormOprihod);

const clientFillselPathName = new FillSelectPathNames('sel-pathName');  // клиент select thml "Категории"
export const clientTableOptihod = new AllDataTableOprihod('contain-table-oprihod');

// оприходовать
invoker.setCommandOprihod(new Oprihod(appcn));
const clientResOprihod = new AnswerOprihod("oprihodinfo");
const answerResHolder = new ResultHolder(clientResOprihod);
const btnOprihod = document.getElementById('input-oprihod');
btnOprihod?.addEventListener('click', async () => {
    dom.loadImage(true, 'loadoprihod');
    dom.textMessage('oprihodinfo', 'оприходование в МойСклад...');
    const isCheckSend = document.getElementById('issendsklad');
    const ischeck = (<HTMLInputElement>isCheckSend).checked;
    const res = await invoker.sendOprihod({who: "admin", role: "admin", isSendSklad: ischeck});
    const rHolder = new Holder('answerOprihod', res);
    answerResHolder.execute(rHolder);
    dom.loadImage(false, 'loadoprihod');
    dom.textMessage('oprihodinfo');
});

/**
 * старт при загрузке стр.
 */
const firstStart = async () => {
    invoker.setAllProductsFolder(new GetAllProductFolder(appcn));           // установить команду получения списка категорий
    const arrCats = await invoker.getAllProdFolder('allProdFolder');        // получить список категорий по команде
    const holderSelPathName = new ResultHolder(clientFillselPathName);      // создать хранителя результата вып-я команды
    const holder = new Holder('sel-pathName', arrCats);                     // объект результата вып-я команды
    await holderSelPathName.execute(holder);                                // хранитель отдает результат клиенту (здесь select html)
    invoker.setGetAllDataTableOprihod(new GetAllFromTableOprihod(appcn));
    const tableDataOpr = await invoker.getAllDataTableOprihod();
    const holderTableOprh = new ResultHolder(clientTableOptihod);
    const holderTO = new Holder('holderFirstStart', tableDataOpr);
    holderTableOprh.execute(holderTO);
};



if (cntOprihod && cntAllprd)
    for (let v of [cntOprihod, cntAllprd]) {
        v.addEventListener('click', async (e) => {
            const target = e.target as HTMLAnchorElement;
            switch (target.name) {
                case EnumPageName.OPRIHOD: {
                    await firstStart();          
                    break;
                }
                case EnumPageName.ALLPROD: {
                    
                    const table = new TableProducts('table-container');  //ClientData
                    if (!table || (!table.cnt)) break;
                    await dom.createListCats(idContainerCats, table, invoker); 

                }
            } 
        });
    }

firstStart();

 
