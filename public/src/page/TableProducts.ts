import { Holder } from "../ResultHolder.ts/ResultHolder";
import { dom } from "../dom";
import { Clearable } from "../types/Clearable";
// import { MinimizeResponseListProds } from "../types/TypesFrontend";


export abstract class ClientData {
    cnt: HTMLElement | null = null;  // динамический div контейнер для таблицы 

    abstract executeCallback<T>(holder: Holder<T>): Promise<void>;

    fillContainer(obj: HTMLElement): void {
        if (this.cnt) 
            this.cnt.appendChild(obj);
    }

    clearContainer(): void {
        if (this.cnt)
            for (let domElem of Array.from(this.cnt.children)) {
                this.cnt.removeChild(domElem);
            }
    }
}

/**
 * Порядок: экзмпл ClientData управляет своим содержимым.
 * у него есть объект-контейнер html и колбек-метод.
 * Сначала где-то получаю данные из сервера вызовом команды Command, данные превращаю в
 * объект Holder<T>, потом его отдаю на выполнение ResultHolder.execute(holder),
 * последний в  свою очередь вызывает метод executeCallback<T>(holder: Holder<T>)
 * у ClientData
 */

export class TableProducts extends ClientData implements Clearable {
    
    constructor (id: string) {
        super();
        const c = dom.createContainer(id);
        this.cnt = (c) ? c : null;
    }

    /**
     * Callback. Создать таблицу. 
     * @param holder результат из мойсклад
     */
    async executeCallback<T>(holder: Holder<T>) {
        const arrdata = holder.data.arrData;
        const tbl = await dom.makeTable<T>(arrdata);
        this.clearContainer();
        this.fillContainer(tbl);
        const who = document.getElementById('id-label-table-list-from');
        who!.textContent = holder.name + ` [всего: ${arrdata.length}]`;
    }
}