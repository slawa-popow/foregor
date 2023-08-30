import { BaseCommand } from "../concreteCommands/BaseCommand";
import { MinimizeResponseListProds } from "../types/TypesFrontend";
import { AttributesByPathName } from '../types/AttributesByPathName';


/**
 * Отправитель команд. Содержит команды приложения.
 */
export class Invoker {
    private allProductsFolder: BaseCommand | null = null;   // категории (разделы) продукций МойСклад
    private productByCats: BaseCommand | null = null;       // список товаров определенной категории (раздела МойСклад)
    private colorNameByCategory: BaseCommand | null = null; // атрибуты цветов и названий по выбранной (select html) категории
    private sendFormOprihod: BaseCommand | null = null;     // отправить форму для добавления товара в таблицу 


     /**
     * -----------------------------------------------------------------------
     * @param command Отправить заполненную форму цвет имя кол-во фото
     * на сервер. получить таблицу.
     */
     setSendFormOprihod(command: BaseCommand) {
        if (!this.sendFormOprihod)
            this.sendFormOprihod = command;
    }

    async sendDataFormOprihod<T>(formData: any): Promise<T[]> {
        const result = (this.sendFormOprihod) ? await this.sendFormOprihod.execute<T>(formData) : null;
        return (result) ? result : [];
    }


    /**
     * -----------------------------------------------------------------------
     * @param command Установить команду получения атрибутов: имя, цвет по pathName 
     * type: AttributesByPathName
     * (выбранный элемент списка select html "Категории")
     */
    setGetAttrsColorName(command: BaseCommand) {
        this.colorNameByCategory = command;
    }

    async getAttrsColorName(pathName: string): Promise<AttributesByPathName> {
        let attrs = {pathName: pathName, names: [''], colors: ['']}
        if (this.colorNameByCategory) {
            const result = await this.colorNameByCategory.execute<AttributesByPathName>(pathName);
            if (Array.isArray(result) && result.length > 0)
                return result[0];
        }
         
        return attrs;
    }


    /**
     * -----------------------------------------------------------------------
     * @param command Установить команду получения всех товаров
     * из моего склада по определенному URI
     */
    setGetProdByCats(command: BaseCommand) {
        if (!this.productByCats)
            this.productByCats = command;
    }

    async сallbackGetProdByCats<T extends MinimizeResponseListProds>(url: string, uri: string): Promise<T[]> {
        const result = (this.productByCats) ? await this.productByCats.execute<T>(url, uri) : null;
        return (result) ? result : [];
    }
    

    /**
     * ----------------------------------------------------------------------
     * @param command Установить команду получения
     * всех категорий (разделов) продукции МойСклад
     */
    setAllProductsFolder(command: BaseCommand): void {
        if (!this.allProductsFolder)
            this.allProductsFolder = command;
    }

    async getAllProdFolder(uri: string): Promise<string[]>{
        return (this.allProductsFolder) ? await this.allProductsFolder.execute(uri) : [];
    }
}

export const invoker = new Invoker();