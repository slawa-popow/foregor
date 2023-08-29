
import mysql from 'mysql2/promise';
import { Pool } from "mysql2/promise";
 
import dotenv from 'dotenv';
import { AttributesByPathName, IReturnGetUniqPathes } from '../types/TypesDB';
 
 
dotenv.config();

enum Table {
    Test='test',
    Products='products',
};

class MySqlAgent {

    private HOST: string = process.env.PHOST || '';
    private USER: string = process.env.PUSER || '';
    private DATABASE: string = process.env.PDATABASE || '';
    private PASSWORD: string = process.env.PPASSWORD || '';
    private pool: Pool | null = null;

    constructor() {
        this.setPool()
    }

    setPool(): void {
        const pool: Pool = mysql.createPool({ 
            connectionLimit: 20, 
            host: this.HOST,
            user: this.USER,
            password: this.PASSWORD,
            database: this.DATABASE,
            waitForConnections: true,
            rowsAsArray: false,
        }); 
        this.pool = pool;
    }


    /**
     * Вернуть {pathName: 'abc/defg', names: [...], colors: [...]} uniq атрибуты
     * @param pathName категория по которой вернуть цвет, имя
     */
    async getAttributesByPathName(pathName: string): Promise<AttributesByPathName | null> {
        const connection = await this.pool!.getConnection();
        try {
            if (connection) {

                const [clrs, _services_colors] = await connection.query(`
                SELECT DISTINCT color FROM ${Table.Products} WHERE pathName IN ("${pathName}") AND color<>'';
                `);

                const [nms, _services_names] = await connection.query(`
                SELECT DISTINCT name FROM ${Table.Products} WHERE pathName IN ("${pathName}") AND name<>'';
                `);

                const colors = clrs as {color: string}[];
                const names = nms as {name: string}[];

                const result: AttributesByPathName = {
                    pathName: pathName,
                    names: [...names.map((val) => { return val.name})],
                    colors: [...colors.map((val) => { return val.color})]
                };

                return result;
            }

        } catch (e) { console.log('Error in MySqlAgent->getAttributesByPathName()->catch', e) } 
        finally {
            connection.release();
        }
        return null;
    }


    /**
     * Вернуть уникальные pathName
     */
    async getUniqPathes(): Promise<string[]> {
        const connection = await this.pool!.getConnection();
        try {
            if (connection) {
                const [uniqPathsList, _services] = await connection.query(`SELECT pathName FROM ${Table.Products} GROUP BY pathName ORDER BY LENGTH(pathName);`); 
                const uniqPaths = uniqPathsList as IReturnGetUniqPathes[];
                const resultPaths = uniqPaths.map((val: IReturnGetUniqPathes) => {
                    return val.pathName;
                });
                return resultPaths;
            }

        } catch (e) { console.log('Error in MySqlAgent->getUniqPathes()->catch', e) } 
        finally {
            connection.release();
        }
        return [];
    };


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
