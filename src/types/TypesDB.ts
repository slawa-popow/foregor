
/**
 * Тип данных return метода возвращающего из
 * бд уникальные pathName от мойсклад
 */
export interface IReturnGetUniqPathes {
    pathName: string;
}


/**
 * Результат выборки из бд атрибутов (цвет, имя)
 * по значению pathName
 */
export interface AttributesByPathName {
    pathName: string;
    names: string[];
    colors: string[];
}