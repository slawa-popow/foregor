import { GetAllProdsByPathName } from './concreteCommands/GetAllProdsByPathName';
import { Invoker} from './invoke/Invoker';
import { appcn } from './AppConnect';
import { MinimizeResponseListProds } from './types/TypesFrontend';
import { GetAllProductFolder } from './concreteCommands/GetAllProductFolder';
import { Holder, ResultHolder } from './ResultHolder.ts/ResultHolder';
import { ClientData} from './page/TableProducts';

export const dom = (() => {

    /**
     * Получить от сервера список раздеров МойСклад->Продукция Плиточка,
     * Создать список li a разделов, назначить колбеки получения результата,
     * результат отдать объекту ResultHolder
     * @param idcontainer id <div> контейнера в котором создадутся списки
     * @param invoker отправитель команд
     */
    async function createListCats(idcontainer: string, table: ClientData, invoker: Invoker) {
        const url = '/getProductByCats'; 
        const cnt = document.getElementById(idcontainer);
        invoker.setGetProdByCats(new GetAllProdsByPathName(appcn));
        invoker.setAllProductsFolder(new GetAllProductFolder(appcn));
        const arrCats: string[] = await invoker.getAllProdFolder('allProdFolder');
        const resultHolder = new ResultHolder(table);
        arrCats.forEach((el) => {
            const a = document.createElement('A') as HTMLAnchorElement;
            a.classList.add('list-group-item', 'list-group-item-action', 'list-group-item-success');
            a.href = url;
            a.textContent = el;
            a.addEventListener('click', async (e) => {
            if ((<HTMLElement> e.target).nodeName === 'A') {
                e.preventDefault();
                const uri = (<HTMLElement> e.target).textContent as string;
                const result = await invoker.сallbackGetProdByCats<MinimizeResponseListProds>(url, uri) as MinimizeResponseListProds[];
                // debugger;
                const holder = new Holder<MinimizeResponseListProds>(uri, result);
                await resultHolder.execute<MinimizeResponseListProds>(holder);
            }
            });
            cnt!.appendChild(a);
        });
    }

    /**
     * Создать и вернуть контейнерный Html элемент
     * @param id 
     * @returns 
     */
    function createContainer(id: string): HTMLElement | null {
        const cnt = document.getElementById(id);
        return (cnt) ? cnt : null;
    }


    /**
     * Создать и вернуть таблицу данных
     * @param arrData массив с данными
     * @returns 
     */
    async function makeTable<T>(arrData: T[]): Promise<HTMLTableElement> {
        const table = document.createElement('table');
        table.classList.add('table', 'table-striped', 'table-sm', 'custom-style-table');
        // ---------- шея -----------------------------------
        const thead = document.createElement('thead');
        thead.classList.add('thead-light');
        const tr = document.createElement('tr');
        const titleTable = ['№', 'название', 'цвет', 'артикль', 'код', 'категория',];
        titleTable.forEach((v) => {
            const th = document.createElement('th');
            th.textContent = v;
            tr.appendChild(th)
        });
        thead.appendChild(tr);
        table.appendChild(thead);
        // ---------- тело ----------------------------------
        const tbody = document.createElement('tbody');
        arrData.forEach((val, i) => {
            const data = val as MinimizeResponseListProds;
            const tr = document.createElement('tr');
            for (let cellName of [''+(i+1), data.name || '', data.color || '', data.article || '', 
                            data.code || '', data.pathName || '']) {
                                const td = document.createElement('td');
                                td.textContent = cellName;
                                tr.appendChild(td);
                            }
            tbody.appendChild(tr);
        });
        table.appendChild(tbody);
        return table;
    }

    const publicApi = { createListCats, createContainer, makeTable };
    return publicApi;
})();
