
import mysql from 'mysql2/promise';
import { Pool } from "mysql2/promise";
import dotenv from 'dotenv';
 
dotenv.config();

enum Table {
    Test='test',
    Products='products',
};

class MySqlAgent {

    private HOST: string = process.env.HOST || '';
    private USER: string = process.env.USER || '';
    private DATABASE: string = process.env.DATABASE || '';
    private PASSWORD: string = process.env.PASSWORD || '';
    private pool: Pool | null = null;

    constructor() {
        this.setPool()
    }

    setPool(): void {
        const pool: Pool = mysql.createPool({ 
            connectionLimit: 20, 
            host: this.HOST,
            user: this.USER,
            port: 3306,
            password: this.PASSWORD,
            database: this.DATABASE,
            waitForConnections: true,
            rowsAsArray: true,
        }); 
        this.pool = pool;
    }


    async writeAllProducts(data: (string | number | boolean)[]): Promise<boolean> {
        const connection = await this.pool!.getConnection();
        try {
            if (connection) {
                connection.query(`INSERT INTO ${Table.Products}
                (pid, name, color, accountId, shared, 
                updated, full_name, code, externalCode, archived, 
                pathName, effectiveVat, effectiveVatEnabled, vat, vatEnabled, 
                useParentVat, taxSystem, paymentItemType, discountProhibited, weighed, 
                weight, volume, variantsCount, isSerialTrackable) 
                VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`, data);
                
                return true;
            }

        } catch (e) { console.log('Error in MySqlAgent->setTestData()->catch', e) } 
        finally {
            connection.release();
        }
        return false;
    }
    

    async setTestData(data: Array<string>): Promise<any> { 
        const connection = await this.pool!.getConnection();

        try {
            if (connection) {
                const uuids = connection.query(`INSERT INTO ${Table.Test}(name, age) VALUES(?, ?);`, data);  
                return uuids;
            }

        } catch (e) { console.log('Error in MySqlAgent->setTestData()->catch', e) } 
        finally {
            connection.release();
        }
        return [];
    } 


}


export const db = new MySqlAgent();
