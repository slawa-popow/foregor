import { ClientData } from "../page/TableProducts";
import { HolderData } from "../types/HolderData";



export class Holder<T> {
    private hold: T[]  = [];
    
    constructor(public name: string, data: T[]) {
        this.data = data;
    }

    set data(d: T[]) {
        if (Array.isArray(d)) {
            this.hold.length = 0;
            this.hold = [...d]
        }
    }

    get data(): HolderData<T> {
        if (this.hold) {
            return {name: this.name, arrData: this.hold}
        }
        return {name: '', arrData: []};
    }

}



export class ResultHolder {

    constructor(public client: ClientData) {}

    async execute<T>(holder: Holder<T>) {
        if (this.client) {
            await this.client.executeCallback<T>(holder);
        }
    }

}