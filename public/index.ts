
import { appcn } from "./src/AppConnect";
import { Holder, ResultHolder } from "./src/ResultHolder.ts/ResultHolder";
import { GetAllProductFolder } from "./src/concreteCommands/GetAllProductFolder";
import { dom } from "./src/dom"; 
import { invoker } from "./src/invoke/Invoker";
import { FillSelectPathNames, TableOprihod, TableProducts } from "./src/page/clients";
import { EnumPageName } from "./src/types/EnumPageName";

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
const clientTableOptihod = new TableOprihod('cnt-table-oprihod');

/**
 * старт при загрузке стр.
 */
const firstStart = async () => {
    invoker.setAllProductsFolder(new GetAllProductFolder(appcn));       // установить команду получения списка категорий
    const arrCats = await invoker.getAllProdFolder('allProdFolder');    // получить список категорий по команде
    const holderSelPathName = new ResultHolder(clientFillselPathName);  // создать хранителя результата вып-я команды
    const holder = new Holder('sel-pathName', arrCats);                 // объект результата вып-я команды
    await holderSelPathName.execute(holder);                            // хранитель отдает результат клиенту (здесь select html)
    const holderTableOprh = new ResultHolder(clientTableOptihod);
    const holderTableOpr = await invoker.

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

 
