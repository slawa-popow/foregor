import { body } from "express-validator"
import { Request, Response, NextFunction } from 'express';
import { db } from "../database/MySqlAgent";
import { TypeInputFormOprihod } from "../types/TypeInputFormOprihod";

export const uriSkladValid = () => {
    return body('URISklad').exists().withMessage('Не верная ссылка МойСклад')
            .isString().withMessage('Не верный тип данных')
            .trim().isLength({min: 6, max: 250}).withMessage('Cлишком длинное/короткое значение')
};


/**
 * Валидация данных от фронта для получения атрибутов (имя, цвет)
 * по uri pathName.
 */
export const validInputDataToGetAttributes = () => {
    return body('pathName').exists().notEmpty().withMessage('пустое значение pathName')
           .isString().withMessage('Не верный тип данных')
           .trim().isLength({min: 2, max: 160}).withMessage('не корректная длина значения')
           .matches(/^[0-9А-Яа-яA-Za-zЁё\s-_.,:/]+$/).withMessage('не корректное значение pathName');
};


export const colorNameFormOprihodValid = (value: string) => {
    return body(value).exists().notEmpty().withMessage(`пустое значение ${value}`)
            .isString().withMessage('Не верный тип данных')
            .trim().isLength({min: 1, max: 56}).withMessage('не корректная длина значения');
};


export const countFormOprihodValid = () => {
    return body('count').exists().withMessage('поле должно существовать')
            .isNumeric().withMessage('в поле Количество должно быть только число')
            .trim().isLength({min: 0, max: 6}).withMessage('не корректная длина значения');
};


export const deleteRowValid = () => {
    return body('delId').exists().withMessage('поле должно существовать')
           .trim().isLength({min: 1, max: 56}).withMessage('не корректная длина значения');
};


export async function isExistsNameColor (request: Request, response: Response, next: NextFunction) {
    const prodData = request.body as TypeInputFormOprihod;
    const isExistsId = await db.getIdFromProducts(prodData.color, prodData.name);
    if (isExistsId.length > 0) {
        prodData.id = +isExistsId[0].id;
        return next();
    } else {
        return response.status(400).json( [{ errors: [{message: 'Такой продукции с таким цветом нет.', field: '--'}]}] ); 
    }
};

