import { BaseCommand } from "../concreteCommands/BaseCommand";
import { MinimizeResponseListProds } from "../types/TypesFrontend";


/**
 * Отправитель команд. Содержит команды приложения.
 */
export class Invoker {
    private allProductsFolder: BaseCommand | null = null;   // категории (разделы) продукций МойСклад
    private productByCats: BaseCommand | null = null;       // список товаров определенной категории (раздела МойСклад)


    /**
     * -----------------------------------------------------------------------
     * @param command Установить команду получения всех товаров
     * из моего склада по определенному URI
     */
    setGetProdByCats(command: BaseCommand) {
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
        this.allProductsFolder = command;
    }

    async getAllProdFolder(uri: string): Promise<string[]>{
        return (this.allProductsFolder) ? await this.allProductsFolder.execute(uri) : [];
    }
}

export const invoker = new Invoker();