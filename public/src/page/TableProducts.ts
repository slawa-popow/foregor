import { Holder } from "../ResultHolder.ts/ResultHolder";
import { dom } from "../dom";
import { Clearable } from "../types/Clearable";
// import { MinimizeResponseListProds } from "../types/TypesFrontend";


export abstract class ClientData {
    abstract executeCallback<T>(holder: Holder<T>): Promise<void>;
}

export class TableProducts extends ClientData implements Clearable {
    cnt: HTMLElement | null = null;  // динамический div контейнер для таблицы

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