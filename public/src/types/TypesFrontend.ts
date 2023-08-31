

export interface MinimizeResponseListProds {
    article: string;
    code: string;
    color: string;
    name: string;
    pathName: string;
    idHref: string;
};

// ответ от сервера - таблица оприходования
export interface TypeInputOprihod {
    name: string,
    pathName: string;
    color: string;
    count: string;
    date: string;
    time: string;
    id ?: string | number;
    isPhoto ?: boolean;
    photoPath ?: string;
    errors ?: Array<{message: string, field: string}>;
}