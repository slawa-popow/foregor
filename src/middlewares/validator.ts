import { body } from "express-validator"

export const uriSkladValid = () => {
    return body('URISklad').exists().withMessage('Не верная ссылка МойСклад')
            .isString().withMessage('Не верный тип данных')
            .trim().isLength({min: 6, max: 100}).withMessage('Cлишком длинное/короткое значение')
};

