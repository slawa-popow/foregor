import { body } from "express-validator"

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
            .trim().isLength({min: 1, max: 16}).withMessage('не корректная длина значения');
};

export const countFormOprihodValid = () => {
    return body('count').exists().withMessage('поле должно существовать')
            .isNumeric().withMessage('должно быть только число')
            .trim().isLength({min: 0, max: 6}).withMessage('не корректная длина значения');
};

