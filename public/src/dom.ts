import { GetAllProdsByPathName } from './concreteCommands/GetAllProdsByPathName';
import { Invoker, invoker} from './invoke/Invoker';
import { appcn } from './AppConnect';
import { MinimizeResponseListProds, TypeInputOprihod } from './types/TypesFrontend';
import { GetAllProductFolder } from './concreteCommands/GetAllProductFolder';
import { Holder, ResultHolder } from './ResultHolder.ts/ResultHolder';
import { ClientData, FillSelectColor, FillSelectName} from './page/clients';
import { GetAttributesByPathName } from './concreteCommands/GetAttributesByPathName';
import { CmdSendFormOprihod } from './concreteCommands/CmdSendFormOprihod';

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
     * Наполнить выпадающий список. Данные получить
     * от мойсклад / db
     * @param select -- (#sel-pathName) объект выпадающего списка
     * @param listdata -- список значений для заполнения. 
     *                 Первый из списка пустой/не пустой (emptyFirst: boolean).
     */
    async function fillSelectPahtNamesOprihod(select: HTMLElement, listdata: string[], emptyFirst: boolean = true) {
        const listd = [...listdata];
        if (emptyFirst)
            listd.unshift('---');
        listd.forEach((v, i) => {
            const option = document.createElement('option');
            option.setAttribute('id', `${select.id}_${i}`);
            option.setAttribute('value', v);
            option.textContent = v;
            select?.appendChild(option);
        });
    }


    function setCallbackSelect(select: HTMLElement, callb: (this: HTMLElement, ev: Event) => any) {
        select.addEventListener('change', callb);
    }

    function delCallbackSelect(select: HTMLElement, callb: (this: HTMLElement, ev: Event) => any) {
        select.removeEventListener('change', callb);
    }
    

    const cmdSendDataFormOprihod = new CmdSendFormOprihod(appcn);

    /**
     * Отправка формы с данными оприходывания
     * @param e 
     */
    async function clbSendFormOprihod(e: Event) {
        e.preventDefault();
        const form = (<HTMLFormElement> e.target).form as HTMLFormElement;
        const names = ["sellist-pathName", "sellist-name", "sellist-color", "sellist-count", "sellist-photo"];
        const fdata = new FormData();
        let i = 0; 
        // debugger;
        for (let el of form) {
            if (i > 4) break;
            const name = names[i].split('-')[1];
            if (el instanceof HTMLSelectElement) {
                const opts = el.childNodes as NodeListOf<HTMLOptionElement>;
                let value = '';
                for (let v of opts) {
                    if (v instanceof HTMLOptionElement && v.selected) {
                        value = v.value;
                        break;
                    }
                }
                fdata.append(name, value);
            } else if (el instanceof HTMLInputElement) {
                if (el.type === 'file') {
                    const fls = el.files;
                    if (fls) {
                        for (let f of fls) {
                            fdata.append('file', f);
                        }
                    }
                } else {
                    const value = el.value;
                    fdata.append(name, value);
                }
            }
            i += 1;
        }
        const currDate = new Date().toLocaleString("ru-RU", {timeZone: "Europe/Moscow"});
        const dt = currDate.split(',');
        fdata.append('date', dt[0].trim());
        fdata.append('time', dt[1].trim());

        loadImage(true); 
        textMessage('errinfo', 'Отправка данных...');   
        invoker.setSendFormOprihod(cmdSendDataFormOprihod);
        
        const result = await invoker.sendDataFormOprihod<FormData>(fdata);
        loadImage(false);
        textMessage('errinfo');
        console.log('clb send form: \n', result);
        // for (let [k, v] of fdata.entries()) {console.log(k, v)}
    }

    const commandGetAttrColorName = new GetAttributesByPathName(appcn); // команда получить цвет, имя по namePath
    
    /**
     * Коллбек по выбору элемента списка "Категории" 
     * @param e Event
     */
    async function clbSelPathName(e: Event) {
        const opts = (<HTMLElement> e.target).childNodes as NodeListOf<HTMLOptionElement>;
        invoker.setGetAttrsColorName(commandGetAttrColorName);
        for (let el of opts) {
            if (el instanceof HTMLOptionElement && el.selected) {
                const clientColor = new FillSelectColor('sel-color');
                const clientName = new FillSelectName('sel-name');
                const result = await invoker.getAttrsColorName(el.value);
                const resultHolderColor = new ResultHolder(clientColor);
                const resultHolderName = new ResultHolder(clientName);
                const hldColor = new Holder(result.pathName, result.colors);
                const hldName = new Holder(result.pathName, result.names);
                await resultHolderColor.execute(hldColor);
                await resultHolderName.execute(hldName);
                
                break;       
            }
        }
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
     * Таблица оприходования
     */
    async function makeOprihodTable<T>(arrData: T[]): Promise<HTMLTableElement> {
        const table = document.createElement('table');
        table.classList.add('table', 'table-striped', 'table-sm', 'custom-style-table');
        // ---------- шея -----------------------------------
        const thead = document.createElement('thead');
        thead.classList.add('thead-light');
        const tr = document.createElement('tr'); //(name, color, count, pathName, date, time, photoPath)
        const titleTable = ['id', 'название', 'цвет', 'кол-во', 'из категории', 'дата', 'время', 'удалить'];
        titleTable.forEach((v) => {
            const th = document.createElement('th');
            th.textContent = v;
            tr.appendChild(th)
        });
        thead.appendChild(tr);
        table.appendChild(thead);
        const lastValPathName = (pathName: string): string => {
            try {
               const spl = pathName.split('/');
            const len = spl.length;
            return '../' + spl.slice(len-1, len).join('/'); 
            } catch (e) {}
            return '';
        }
        // ---------- тело ----------------------------------
        const tbody = document.createElement('tbody');
        arrData.forEach((val) => {
            const data = val as TypeInputOprihod;
            const tr = document.createElement('tr');

            for (let cellName of [data.id, data.name || '', data.color || '', data.count || '', 
                lastValPathName(data.pathName), data.date || '', data.time || '', ]) {
                    const td = document.createElement('td');
                    td.textContent = ''+cellName;
                    tr.appendChild(td);
            }
            const a = document.createElement('A') as HTMLAnchorElement;
            a.classList.add('list-group-item', 'list-group-item-action', 'list-group-item-success');
            a.textContent = 'удалить';

            tbody.appendChild(tr);
        });
        table.appendChild(tbody);

        return table;
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

    /**
     * элементу с определенным id назначить текст
     * @param text message
     */
    function textMessage(id: string, text: string = '') {
        const textel = document.getElementById(id);
        textel!.textContent = text;
    }

    /**
     * включить/выключить картинку загрузки
     * @param on 
     */
    function loadImage(on: boolean) {
        const loadImg = document.getElementById('loadstate');
        if (on) {
            loadImg?.classList.remove('noloadstate');
            loadImg?.classList.add('loadstate');
        } else {
            loadImg?.classList.remove('loadstate');
            loadImg?.classList.add('noloadstate');
        }
    }

    const publicApi = { 
        createListCats, createContainer, 
        makeTable, fillSelectPahtNamesOprihod,
        setCallbackSelect, delCallbackSelect, 
        clbSelPathName, clbSendFormOprihod,
        loadImage, textMessage, makeOprihodTable,

    };


    return publicApi;
})();
