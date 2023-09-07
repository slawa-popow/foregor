
/**
 * Для сборки пути к списку продукции через дерево категорий
 */
export interface PatchesToProductList {
    pathName: string;
    name: string;
}


export interface Meta {
    href : string;
    metadataHref ?: string;
    type ?: string;
    mediaType ?: string;
    uuidHref ?: string;
    downloadHref ?: string;
    size ?: number;
    limit ?: number;
    offset ?: number;
    nextHref ?: string;
    previousHref ?: string;
};

export interface Uom {
    meta: Meta;
    name: string;
};

export interface Image {
    meta: Meta;
    title ?: string;
    filename ?: string;
    size ?: number;
    updated ?: string;
    miniature: Meta;
    tiny: Meta;
};

export interface Owner {
    meta: Meta;
}

export interface Group {
    meta: Meta;
}

export interface ProductFolder {
    meta: Meta;
}

export interface Currency {
    meta: Meta;
}

export interface MinPrice {
    value: number;          // * Значение цены
    currency: Currency;     // * Ссылка на валюту в формате Метаданных
}

export interface PriceType {
    meta: Meta;
    id: string;
    name ?: string;
    externalCode: string;
}

export interface SalePrices {
    value: number;              // * Значение цены
    currency: Currency;         // * Ссылка на валюту в формате Метаданных
    priceType: PriceType;       // * Тип цены
}

export interface BuyPrice {
    value: number;
    currency: Currency;
}

export interface Barcodes {
    [key: string]: string | number;
}

export interface Supplier {
    meta: Meta;
}

export interface CountryMeta {
    meta: Meta;
}

export interface FilesMeta {
    meta: Meta;
}

export interface DopAttributes {
    meta: Meta;
    id: string;
    name ?: string;
    type ?: string;
    value ?: string; 
}

export interface ReportBalance {

    meta: Meta;             // Метаданные Товара/Модификации/Серии по которой выдается остаток

    stock : number;         // Остаток
    inTransit : number;     // Ожидание
    reserve : number;       // Резерв
    quantity : number;      // Доступно
    name : string;          // Наименование
    code : string;          // Код
    price ?: number;        // Себестоимость
    salePrice ?: number;    // Цена продажи
    externalCode : string;  // Внешний код сущности, по которой выводится остаток
    stockDays: number;      // Количество дней на складе
    
    uom ?: Uom;               // Единица измерения 
    image ?: Image;
};


export interface ReportStockQueryDB {
    stock : number;         // Остаток
    inTransit : number;     // Ожидание
    reserve : number;       // Резерв
    quantity : number;      // Доступно
    name : string;          // Наименование
    code : string;          // Код
    price ?: number;        // Себестоимость
    salePrice ?: number;    // Цена продажи
    externalCode : string;  // Внешний код сущности, по которой выводится остаток
    stockDays: number;      // Количество дней на складе
    image: string;          // Изображение товара

};

export interface ResponseReportStock {
    context: {
        employee: {
            meta: Meta;
        }
    };

    meta: Meta;
    rows: ReportBalance[];
}

/**
 *  Список товаров по URI дерева категорий мойсклад.
 *  [ * -- обязательно при ответе ]
 */
export interface ProductsByPathCats {
    meta: Meta;
    id: string;                             // * ID Товара
    accountId: string;                      // * ID учетной записи
    owner ?: Owner;                         //   Метаданные владельца (Сотрудника)
    shared: boolean;                        // * Общий доступ
    group: Group;                           // * Метаданные отдела сотрудника
    updated: string;                        // * Момент последнего обновления сущности
    name: string;                           // * Наименование Товара
    code ?: string;                         //   Код Товара
    externalCode: string;                   // * Внешний код Товара
    archived: boolean;                      // * Добавлен ли Товар в архив
    pathName: string;                       // * Наименование группы, в которую входит Товар
    productFolder ?: ProductFolder;         //   Метаданные группы Товара 
    effectiveVat ?: number;                 //   Реальный НДС %
    effectiveVatEnabled ?: boolean;         //   Дополнительный признак для определения разграничения реального НДС = 0 
    vat ?: number;                          //   НДС %
    vatEnabled ?: boolean;                  //   Включен ли НДС для товара
    useParentVat: boolean;                  // * Используется ли ставка НДС родительской группы.
    taxSystem ?: string;                    //   Код системы налогообложения
    uom ?: Uom;                             //   Единицы измерения
    images ?: Image;                        //   Массив метаданных Изображений (Максимальное количество изображений - 10)
    minPrice ?: MinPrice;                   //   Минимальная цена 
    salePrices ?: SalePrices[];             //   Цены продажи
    buyPrice ?: BuyPrice;                   //   Закупочная цена 
    barcodes ?: Barcodes[];                 //   Штрихкоды Комплекта
    supplier ?: Supplier;                   //   Метаданные контрагента-поставщика
    attributes ?: DopAttributes[];          //   Коллекция доп. полей
    paymentItemType ?: string;              //   Признак предмета расчета
    discountProhibited: boolean;            // * Признак запрета скидок
    country ?: CountryMeta;                 //   Метаданные Страны
    article ?: string;                      //   Артикул
    weighed ?: boolean;                     //   Поле, показывающее является ли товар весовым
    weight ?: number;                       //   Вес
    volume ?: number;                       //   Объем
    variantsCount: number;                  // * Количество модификаций у данного товара
    isSerialTrackable ?: boolean;           //   Учет по серийным номерам.
    trackingType ?: string;                 //   Тип маркируемой продукции
    files ?: FilesMeta;                     //   Метаданные массива Файлов (Максимальное количество файлов - 100)
} 

/**
 * [ * -- обязательно при ответе ]
 */
export interface PathNamePlitochka {
    meta: Meta;                         // * Метаданные Группы товаров
    id: string;                         // * ID Группы товаров
    accountId: string;                  // * ID учетной записи 
    owner ?: Owner;                       // Метаданные владельца (Сотрудника)
    code ?: string;                       // Код Группы товаров
    taxSystem ?: any;                     // Код системы налогообложения
    shared: boolean;                    // * Общий доступ
    group: Group;                       // * Метаданные отдела сотрудника
    updated: string;                    // * Момент последнего обновления сущности
    name: string;                       // * Наименование Группы товаров
    description ?: string;                // Описание Группы товаров
    externalCode: string;               // * Внешний код Группы товаров
    archived: boolean;                  // * Добавлена ли Группа товаров в архив
    pathName: string;                   // * Наименование Группы товаров, в которую входит данная Группа товаров
    productFolder ?: ProductFolder;       // Ссылка на Группу товаров, в которую входит данная Группа товаров, в формате Метаданных
    effectiveVat ?: number;               // Реальный НДС %

    /*
        Дополнительный признак для определения разграничения реального НДС = 0 
        или "без НДС". (effectiveVat = 0, effectiveVatEnabled = false) -> 
        "без НДС", (effectiveVat = 0, effectiveVatEnabled = true) -> 0%.
    */
    effectiveVatEnabled ?: boolean;       
    useParentVat: boolean;              // * Используется ли ставка НДС родительской группы
    vat ?: number;                        // НДС %
    vatEnabled ?: boolean;                // Включен ли НДС для группы
}

export interface ResponseQueryMySklad<T> {
    context: {
        employee: {
            meta: Meta;
        }
    };

    meta: Meta;
    rows: T[];
}


export interface InfoSizeQuery {
    size: number | null;
    limit: number | null,
    offset: number,
    nextHref ?: string | null;
    previousHref ?: string | null;
}

/**
 * Для получения большого числа данных (продуктов) имеющих лимит
 * на выборку из МойСклад (больше 1000 единиц ра один запрос)
 */
export interface QueryProducts<T> {
    sizeData: InfoSizeQuery | null;
    rows: T[];
}


export interface MinimizeResponseListProds {
    article: string;
    code: string;
    color: string;
    name: string;
    pathName: string;
    idHref: string;
};

// создавать оприходования в МойСклад
export interface ExportOprihod {
    organization: {meta: Meta};
    store: {meta: Meta};
    description: string;            // комментарии
    positions: Array<{
        quantity: number,
        price ?: number,
        assortment: {
            meta: Meta
        }
    }>;
}


export interface TypeJoinOprihod {
    pid: string;
    name: string;
    color: string;
    article: string;
    count: number;
}