import { AppConnect } from "../AppConnect";
import { Command } from "../types/Command";


export abstract class BaseCommand implements Command{
    protected respExecute: any = null;

    constructor (protected reciever: AppConnect) {}

    abstract execute<T>(...args: any[]): Promise<T[]>;

    getResponse() {
        const returnResponse = this.respExecute;
        return returnResponse;
    }
}