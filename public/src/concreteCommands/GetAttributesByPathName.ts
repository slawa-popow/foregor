import { AppConnect } from "../AppConnect";
import { BaseCommand } from "./BaseCommand";


/**
 * Команда. Получить атрибуты: имя, цвет по pathName 
 * type: AttributesByPathName
 * (выбранный элемент списка select html "Категории")
 */
export class GetAttributesByPathName extends BaseCommand {
    
    constructor(reciever: AppConnect) {
        super(reciever)
    }
    

    async execute<T>(pathName: string): Promise<T[]> {
        this.respExecute = await this.reciever.getAttributesNameColorsByPathName(pathName) as T[];
        return this.getResponse();
    }

}