// import { MinimizeResponseListProds } from "./TypesFrontend";


/**
 * Интерфейс Команды объявляет метод для выполнения команд.
*/
export interface Command {
    getResponse(): Promise<Array<any>>;
    execute<T>(...args: any[]): Promise<T[]>;
}