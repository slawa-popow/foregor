

export interface TypeInputFormOprihod {
    name: string,
    pathName: string;
    color: string;
    count: string;
    date: string;
    time: string;
    article: string;
    id ?: string | number;
    isPhoto ?: boolean;
    photoPath ?: string;
    products_id ?: number;
}

// команда оприходовать. Отправить с запросом кто, его роль в системе...
export interface DoOprihod {
    who: string;
    role: string;
    isSendSklad: boolean;   // чекбокс отправить оприходования в склад
}