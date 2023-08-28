import { AppConnect } from "../AppConnect";
import { BaseCommand } from "./BaseCommand";


/**
 * Команда получения списка разделов (категорий)
 * МойСклад/Продукция Плиточка
 */
export class GetAllProductFolder extends BaseCommand {

    constructor(reciever: AppConnect) {
        super(reciever);
    }
    

    async execute<T>(uri: string): Promise<T> {
        return await this.reciever.getProdFolders(uri);
    }
}