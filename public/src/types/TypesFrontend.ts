

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
    products_id: number;
    name: string;
    pathName: string;
    color: string;
    article: string;
    count: string;
    date: string;
    time: string;
    id ?: string | number;
    isPhoto ?: boolean;
    photoPath ?: string;
    errors ?: Array<{message: string, field: string}>;
}

// команда оприходовать. Отправить с запросом кто, его роль в системе...
export interface DoOprihod {
    who: string;
    role: string;
}