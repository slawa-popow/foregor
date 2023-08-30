import { AppConnect } from "../AppConnect";
import { BaseCommand } from "./BaseCommand";


/**
 * Отправить заполненную форму цвет имя кол-во фото
 * на сервер. получить таблицу
 */
export class CmdSendFormOprihod extends BaseCommand {
    
    constructor(reciever: AppConnect) {
        super(reciever)
    }
    

    async execute<T>(formData: FormData): Promise<T[]> {
        this.respExecute = await this.reciever.getRespSendFormDataOprihod(formData) as T[];  //appcnt
        return this.getResponse();
    }

}