
/**
 * Результат выборки из бд атрибутов (цвет, имя)
 * по значению pathName
 */
export interface AttributesByPathName {
    pathName: string;
    names: string[];
    colors: string[];
}