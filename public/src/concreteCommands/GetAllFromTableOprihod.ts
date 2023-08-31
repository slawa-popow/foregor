import { AppConnect } from "../AppConnect";
import { TypeInputOprihod } from "../types/TypesFrontend";
import { BaseCommand } from "./BaseCommand";


/**
 * Команда. Получить всю таблицу добавленной продукции для оприходования
 */
export class GetAllFromTableOprihod extends BaseCommand {
    
    constructor(reciever: AppConnect) {
        super(reciever)
    }
    

    async execute<T>(): Promise<T[]> {
        this.respExecute = await this.reciever.getTableOprihod() as TypeInputOprihod;
        return this.getResponse();
    }

}