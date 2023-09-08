
import mysql from 'mysql2/promise';
import { Pool } from "mysql2/promise";
 
import dotenv from 'dotenv';
import { AttributesByPathName, IReturnGetUniqPathes } from '../types/TypesDB';
import { TypeInputFormOprihod } from '../types/TypeInputFormOprihod';
import { createTableAllOprihod, createTableOprihod } from './preparedSQL';
import { mySklad } from '../mysklad/MySklad';
import { TypeJoinOprihod } from '../types/TypesMySklad';

 
 
dotenv.config();

export enum Table {
    Test='test',
    Products='products',
    OneOprihod='one_oprihod',
    Oprihod='oprihod',
    Admins='admins',
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


    async checkIdUser(usid: string): Promise<string[]> {
        const connection = await this.pool!.getConnection();
        try {
            if (connection) {
                const [_res, _serv] = await connection.query(`SELECT name, telegram_id FROM ${Table.Admins} WHERE telegram_id=${usid}`);
                const res = _res as {name: string, telegram_id: string}[];
                if (res.length > 0)
                    return [res[0].name, res[0].telegram_id]; 
            }

        } catch (e) { console.log('Error in MySqlAgent->checkIdUser()->catch', e) } 
        finally {
            connection.release();
        }
        return [];
    }


    /**
     * Создать таблицу, если такой не существует то все-равно создать
     */
    async createTableIfNotExist(tableName: string): Promise<boolean> {
        const connection = await this.pool!.getConnection();
        try {
            if (connection) {
                await connection.query(createTableOprihod(tableName));
                return true;
            }

        } catch (e) { console.log('Error in MySqlAgent->createTableIfNotExist()->catch', e) } 
        finally {
            connection.release();
        }
        return false;
    }

    /**
     * Выборка всего из таблицы
     */
    async getAllDataTable<T>(tableName: string): Promise<T[]> {
        const connection = await this.pool!.getConnection();
        try {
            if (connection) {
                await this.createTableIfNotExist(tableName);
                const [_allData, _services] = await connection.query(`SELECT * FROM ${tableName};`);
                const allData = _allData as T[];  
                return allData;
            }

        } catch (e) { console.log('Error in MySqlAgent->getAllDataTable()->catch', e) } 
        finally {
            connection.release();
        }
        return [];
    }


    /**
     * Удалить строку из таблицы оприходования по айди,
     * вернуть таблицу.
     * @param rowId id строки которую удалить
     * @returns таблица оприходования
     */
    async delRowById(rowId: string): Promise<TypeInputFormOprihod[]> {
        const connection = await this.pool!.getConnection();
        try {
            if (connection) {
                await connection.query(`DELETE FROM ${Table.OneOprihod} WHERE id=${rowId};`);
                const res = await this.getAllDataTable<TypeInputFormOprihod>(Table.OneOprihod); 
                return res;
            }

        } catch (e) { console.log('Error in MySqlAgent->getAllDataTable()->catch', e) } 
        finally {
            connection.release();
        }
        return [];
    }

    /**
     * Оприходовать таблицу 
     */
    async doOprihod(isCheck: boolean) {
        const connection = await this.pool!.getConnection();
        try {
            if (connection) {
                if (isCheck) {
                    const [_arrIds, _serv] = await connection.query(`
                        SELECT ${Table.Products}.pid, ${Table.OneOprihod}.name, ${Table.OneOprihod}.color, ${Table.OneOprihod}.article, ${Table.OneOprihod}.count
                        FROM
                        ${Table.OneOprihod} INNER JOIN ${Table.Products}
                        ON ${Table.OneOprihod}.products_id=${Table.Products}.id;
                    `);
                    const arrIds = _arrIds as TypeJoinOprihod[];
                    const mysklResult =  await mySklad.oprihod(arrIds);
                    
                    return [mysklResult];
                } else {
                    const table = await this.getAllDataTable<TypeInputFormOprihod>(Table.OneOprihod);
                    const todayDate = new Date().toLocaleString("ru-RU", {timeZone: "Europe/Moscow"});
                    await connection.query(createTableAllOprihod(Table.Oprihod));   // если не сущ.

                    if (table.length > 0) {
                        for (let d of table) {
                            const barr = [
                                d.products_id || '',
                                todayDate || '',
                                d.name || '',
                                d.color || '',
                                d.article || '',
                                d.count || 0,
                                d.pathName || '',
                                d.date || '',
                                d.time || '',
                                d.photoPath || ''
                            ] ;
                            await connection.query(`
                            INSERT INTO ${Table.Oprihod}(products_id, date_oprihod, name, color, article, count, pathName, date, time, photoPath)
                            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                            `, barr);
                        }
                    }
                }
                await connection.query(`DROP TABLE ${Table.OneOprihod};`)
            }

        } catch (e) { console.log('Error in MySqlAgent->doOprihod()->catch', e) } 
        finally {
            connection.release();
        }
        return [];
    }


    async getIdFromProducts(color: string, name: string): Promise<{id: number}[]> {
        const connection = await this.pool!.getConnection();
        try {
            if (connection) {
                const [_idProd, _serv] = await connection.query(`SELECT id FROM ${Table.Products} WHERE name in ("${name}") AND color in ("${color}")`);
                const idProd = _idProd as {id: number}[];  
                return (idProd.length > 0) ? [idProd[0]] : [];
            }

        } catch (e) { console.log('Error in MySqlAgent->setTestData()->catch', e) } 
        finally {
            connection.release();
        }
        return [];
    }


    /**
     * Добавить один продукт в таблицу и вернуть всю таблицу
     * @param prodData - данные для записи
     * @returns - все из таблицы
     */
    async addProductToTableOprihod(prodData: TypeInputFormOprihod): Promise<TypeInputFormOprihod[]> {
        const connection = await this.pool!.getConnection();
        try {
            if (connection) {
                await this.createTableIfNotExist(Table.OneOprihod);
                
                const arrValues = [
                    prodData.id, prodData.name, prodData.color, prodData.article, (prodData.count === '') ? 0:prodData.count, prodData.pathName,
                    prodData.date, prodData.time, prodData.photoPath || ''
                ];
                await connection.query(`
                    INSERT INTO ${Table.OneOprihod}
                    (products_id, name, color, article, count, pathName, date, time, photoPath)
                    VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)
                `, arrValues); 
                const allOprihod = await this.getAllDataTable<TypeInputFormOprihod>(Table.OneOprihod);
                return allOprihod;
            }

        } catch (e) { console.log('Error in MySqlAgent->addProductToTableOprihod()->catch', e) } 
        finally {
            connection.release();
        }
        return [];
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
    


    //--------- test --------------------------------------
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
