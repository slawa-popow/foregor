import { AppConnect } from "../AppConnect";
import { DoOprihod } from "../types/TypesFrontend";
import { BaseCommand } from "./BaseCommand";


/**
 * Оприходовать таблицу в МойСклад
 *  
 */
export class Oprihod extends BaseCommand {
    
    constructor(reciever: AppConnect) {
        super(reciever)
    }
    

    async execute<T>(data: DoOprihod): Promise<T[]> {
        this.respExecute = await this.reciever.doOprihod(data) as T[];  //appcnt
        return this.getResponse();
    }

}