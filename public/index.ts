
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
import { RefreshTokenData } from "./src/types/TypesFrontend";

declare const window: {
    Telegram: TelegramWebApps.SDK;
} & Window;



const datep = document.getElementById('currenttime');  
setInterval( () => {
    if (datep)
        datep.textContent = 'Таблица оприходования ' + 
                new Date().toLocaleString("ru-RU", {timeZone: "Europe/Moscow"});
}, 1000);
 
(() =>{ //
    const inputCount = document.getElementById("sel-count");
    if (inputCount) {
        inputCount.addEventListener("keyup", function() {
            const input = <HTMLInputElement>this;
            
            if (input.value.length > 17) {
                const chank = [...input.value].slice(0, 16);
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
    dom.loadImage(true, 'loadoprcats'); 
    dom.textMessage('oprinfocats', 'Загрузка данных в списки...');
    const arrCats = await invoker.getAllProdFolder('allProdFolder');        // получить список категорий по команде
    const holderSelPathName = new ResultHolder(clientFillselPathName);      // создать хранителя результата вып-я команды
    const holder = new Holder('sel-pathName', arrCats);                     // объект результата вып-я команды
    await holderSelPathName.execute(holder);                                // хранитель отдает результат клиенту (здесь select html)
    dom.loadImage(false, 'loadoprcats'); 
    dom.textMessage('oprinfocats');
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


const dwnl = document.getElementById('input-downloadfile');
window.Telegram.WebApp.ready();

dwnl!.addEventListener('click', async (e) => {
    try {
        e.preventDefault();
        const blob = await appcn.getExcelFile();
        if (blob) {
            // const file = window.URL.createObjectURL(blob);
            // window.location.assign(file);
        
            
            // const url = window.URL.createObjectURL(blob);
            // const a = document.createElement('a');
            // a.href = url;
            // a.download = "AllOprihods.xlsx";
            // document.body.appendChild(a); 
            // a.click();    
            // a.remove();   
            const urllink = appcn.getLinkDownloadExcell();
            // @ts-ignore
            window.Telegram.WebApp.openLink(urllink);
        }

    } catch (e) { console.log('error download file', e) } 
})


// замена токена МойСклад
const btnRefreshToken = document.getElementById('refresh-token');
btnRefreshToken?.addEventListener('click', async (e) => {
    e.preventDefault();
    
    const form = (<HTMLFormElement> e.target).form as HTMLFormElement;
    const ilogin = form['sklad-login'].value;
    const ipassw = form['sklad-password'].value;

    const myauth = Buffer.from(ilogin + ':' + ipassw).toString('base64');
    const sendData: RefreshTokenData = {credential: myauth, errors: []};
    const resultTokenRef = await appcn.sendRefreshToken(sendData);
    const infop = document.getElementById('resultreftoken');
    if (resultTokenRef.errors.length > 0) {
        infop!.setAttribute('style', 'color: red; font-size: 0.8em;');
        infop!.textContent = resultTokenRef.errors[0];
    } else {
        infop!.setAttribute('style', 'color: green; font-size: 0.8em;');
        infop!.textContent = 'токен: ' + resultTokenRef.credential;
    }

});


// перезапись таблицы product
const btnRewriteTableDb = document.getElementById('rewrite-db');
const pinforew = document.getElementById('info-rewriteDb');

btnRewriteTableDb?.addEventListener('click', async (e) => {
    e.preventDefault();
    pinforew!.textContent = '';
    dom.loadImage(true, 'loadstaterewrite'); 
    dom.textMessage('errinforewrite', 'Перезапись данных в таблицу бд... Это может занять время.');
    const result = await appcn.rewriteProductsTable();
    dom.loadImage(false, 'loadstaterewrite'); 
    dom.textMessage('errinforewrite');
    if (result.result === 'ok') {
        pinforew!.setAttribute('style', 'font-size: 0.9em; color: green;');
        pinforew!.textContent = 'Готово.'
    } else {
        pinforew!.setAttribute('style', 'font-size: 0.8em; color: red;');
        pinforew!.textContent = 'Ошибка'
    }
})

