import { AppConnect } from "../AppConnect";
import { BaseCommand } from "./BaseCommand";


/**
 * Удалить строку таблицы оприходования
 *  
 */
export class CmdDeleteRowTableOprihod extends BaseCommand {
    
    constructor(reciever: AppConnect) {
        super(reciever)
    }
    

    async execute<T>(idrow: string): Promise<T[]> {
        this.respExecute = await this.reciever.deleteRow<T>(idrow) as T[];  //appcnt
        return this.getResponse();
    }

}