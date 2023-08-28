
import { dom } from "./src/dom"; 
import { invoker } from "./src/invoke/Invoker";
import { TableProducts } from "./src/page/TableProducts";
import { EnumPageName } from "./src/types/EnumPageName";
 

const idContainerCats = 'div-categories';
const cntAllprd = document.getElementById('li-menu-allprod');
const cntOprihod = document.getElementById('li-menu-oprihod');

if (cntOprihod && cntAllprd)
    for (let v of [cntOprihod, cntAllprd]) {
        v.addEventListener('click', async (e) => {
            const target = e.target as HTMLAnchorElement;
            switch (target.name) {
                case EnumPageName.OPRIHOD: {
                    
                    break;
                }
                case EnumPageName.ALLPROD: {
                    
                    const table = new TableProducts('table-container');
                    if (!table || (!table.cnt)) break;
                    await dom.createListCats(idContainerCats, table, invoker); 

                }
            } 
        });
    }



 
