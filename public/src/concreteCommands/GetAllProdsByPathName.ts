import { AppConnect } from "../AppConnect";
import { BaseCommand } from "./BaseCommand";


/**
 * Команда. Получить список продукции по URI pathName 
 * МойСклад/Продукция Плиточка
 */
export class GetAllProdsByPathName extends BaseCommand {
    
    constructor(reciever: AppConnect) {
        super(reciever)
    }
    

    async execute<T>(url: string, uri: string): Promise<T[]> {
        this.respExecute = await this.reciever.getProductByCats(url, uri) as T[];
        return this.getResponse();
    }

}