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
    private getDataTableOprihod: BaseCommand | null = null; // получить таблицу добавленных продуктов для оприходования
    private deleteRowFromTable: BaseCommand | null = null;  // удалить строку из таблицы оприходований

     /**
     * -----------------------------------------------------------------------
     * @param command Отправить заполненную форму цвет имя кол-во фото
     * на сервер. получить таблицу.
     */
     setSendFormOprihod(command: BaseCommand) {
        if (!this.sendFormOprihod)
            this.sendFormOprihod = command;
    }

    async sendDataFormOprihod<T>(formData: FormData): Promise<T[]> {
        const result = (this.sendFormOprihod) ? await this.sendFormOprihod.execute<T>(formData) : null;
        return (result) ? result : [];
    }


     /**
     * -----------------------------------------------------------------------
     * @param command удалить строку из таблицы оприходований
     */
     setCmdDeleteRow(command: BaseCommand) {
        if (command)
            this.deleteRowFromTable = command;
    }

    async sendDeleteRowById<T>(rowId: string): Promise<T[]> {
        const result = (this.deleteRowFromTable) ? await this.deleteRowFromTable.execute<T>(rowId) : null;
        return (result) ? result : [];
    }


     /**
     * -----------------------------------------------------------------------
     * @param command получить таблицу добавленных продуктов для оприходования
     */
     setGetAllDataTableOprihod(command: BaseCommand) {
        if (command)
            this.getDataTableOprihod = command;
    }

    async getAllDataTableOprihod<T>(): Promise<T[]> {
        const result = (this.getDataTableOprihod) ? await this.getDataTableOprihod.execute<T>() : null;
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