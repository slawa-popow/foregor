/**
 *  -------------------------- Подготовленные SQL запросы ------------------------------------
 */

/**
 * Создание таблицы продукции
 */
export const createTableProduct = (tableName: string, _dbName: string = ''): string => {
    return `
    CREATE TABLE IF NOT EXISTS "${tableName}" (
        "id" INT(11) NOT NULL AUTO_INCREMENT,
        "pid" TEXT NOT NULL COLLATE 'utf8mb4_general_ci',
        "name" TEXT NOT NULL COLLATE 'utf8mb4_general_ci',
        "color" TEXT NOT NULL COLLATE 'utf8mb4_general_ci',
        "accountId" TEXT NOT NULL COLLATE 'utf8mb4_general_ci',
        "shared" TEXT NOT NULL COLLATE 'utf8mb4_general_ci',
        "updated" TEXT NOT NULL COLLATE 'utf8mb4_general_ci',
        "full_name" TEXT NOT NULL COLLATE 'utf8mb4_general_ci',
        "code" TEXT NOT NULL COLLATE 'utf8mb4_general_ci',
        "externalCode" TEXT NOT NULL COLLATE 'utf8mb4_general_ci',
        "archived" TINYTEXT NOT NULL COLLATE 'utf8mb4_general_ci',
        "pathName" TEXT NOT NULL COLLATE 'utf8mb4_general_ci',
        "effectiveVat" INT(11) NOT NULL DEFAULT '0',
        "effectiveVatEnabled" TINYTEXT NOT NULL COLLATE 'utf8mb4_general_ci',
        "vat" INT(11) NOT NULL DEFAULT '0',
        "vatEnabled" TINYTEXT NOT NULL COLLATE 'utf8mb4_general_ci',
        "useParentVat" TINYTEXT NOT NULL COLLATE 'utf8mb4_general_ci',
        "taxSystem" TINYTEXT NOT NULL COLLATE 'utf8mb4_general_ci',
        "paymentItemType" TINYTEXT NOT NULL COLLATE 'utf8mb4_general_ci',
        "discountProhibited" TINYTEXT NOT NULL COLLATE 'utf8mb4_general_ci',
        "weighed" TINYTEXT NOT NULL COLLATE 'utf8mb4_general_ci',
        "weight" DOUBLE NOT NULL DEFAULT '0',
        "volume" DOUBLE NOT NULL DEFAULT '0',
        "variantsCount" INT(11) NOT NULL DEFAULT '0',
        "isSerialTrackable" TINYTEXT NOT NULL COLLATE 'utf8mb4_general_ci',
        PRIMARY KEY ("id") USING BTREE
    )
    COLLATE='utf8mb4_general_ci'
    ENGINE=InnoDB;
    `;
};


export const createTableOprihod = (tableName: string): string => { 
   return `CREATE TABLE IF NOT EXISTS ${tableName} (
	id INT(11) NOT NULL AUTO_INCREMENT,
    products_id INT(11) NOT NULL,
	name VARCHAR(50) NOT NULL DEFAULT '' COLLATE 'utf8mb4_general_ci',
	color VARCHAR(50) NOT NULL DEFAULT '' COLLATE 'utf8mb4_general_ci',
    article VARCHAR(50) NOT NULL DEFAULT '' COLLATE 'utf8mb4_general_ci',
	count INT(11) NOT NULL DEFAULT '0',
	pathName VARCHAR(250) NOT NULL DEFAULT '' COLLATE 'utf8mb4_general_ci',
	date VARCHAR(50) NOT NULL DEFAULT '' COLLATE 'utf8mb4_general_ci',
	time VARCHAR(50) NOT NULL DEFAULT '' COLLATE 'utf8mb4_general_ci',
    photoPath VARCHAR(200) NOT NULL DEFAULT '' COLLATE 'utf8mb4_general_ci',
	PRIMARY KEY (id) USING BTREE,
    INDEX products_id (products_id) USING BTREE,
	CONSTRAINT products_id FOREIGN KEY (products_id) REFERENCES products (id) ON UPDATE NO ACTION ON DELETE NO ACTION
    )
    COMMENT='Таблица одного оприходования'
    COLLATE='utf8mb4_general_ci'
    ENGINE=InnoDB; `;
}

 