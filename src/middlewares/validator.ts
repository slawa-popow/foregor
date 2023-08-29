import { body } from "express-validator"

export const uriSkladValid = () => {
    return body('URISklad').exists().withMessage('Не верная ссылка МойСклад')
            .isString().withMessage('Не верный тип данных')
            .trim().isLength({min: 6, max: 100}).withMessage('Cлишком длинное/короткое значение')
};


/**
 * Валидация данных от фронта для получения атрибутов (имя, цвет)
 * по uri pathName.
 */
export const validInputDataToGetAttributes = () => {
    return body('pathName').exists().notEmpty().withMessage('пустое значение pathName')
           .isString().withMessage('Не верный тип данных')
           .trim().isLength({min: 2, max: 60}).withMessage('не корректная длина значения')
           .matches(/^[0-9А-Яа-яA-Za-zЁё\s-_:/]+$/).withMessage('не корректное значение pathName');
};

