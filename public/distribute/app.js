/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./public/index.ts":
/*!*************************!*\
  !*** ./public/index.ts ***!
  \*************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const dom_1 = __webpack_require__(/*! ./src/dom */ "./public/src/dom.ts");
const Invoker_1 = __webpack_require__(/*! ./src/invoke/Invoker */ "./public/src/invoke/Invoker.ts");
const TableProducts_1 = __webpack_require__(/*! ./src/page/TableProducts */ "./public/src/page/TableProducts.ts");
const EnumPageName_1 = __webpack_require__(/*! ./src/types/EnumPageName */ "./public/src/types/EnumPageName.ts");
const idContainerCats = 'div-categories';
const cntAllprd = document.getElementById('li-menu-allprod');
const cntOprihod = document.getElementById('li-menu-oprihod');
if (cntOprihod && cntAllprd)
    for (let v of [cntOprihod, cntAllprd]) {
        v.addEventListener('click', (e) => __awaiter(void 0, void 0, void 0, function* () {
            const target = e.target;
            switch (target.name) {
                case EnumPageName_1.EnumPageName.OPRIHOD: {
                    break;
                }
                case EnumPageName_1.EnumPageName.ALLPROD: {
                    const table = new TableProducts_1.TableProducts('table-container');
                    if (!table || (!table.cnt))
                        break;
                    yield dom_1.dom.createListCats(idContainerCats, table, Invoker_1.invoker);
                }
            }
        }));
    }


/***/ }),

/***/ "./public/src/AppConnect.ts":
/*!**********************************!*\
  !*** ./public/src/AppConnect.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.appcn = exports.AppConnect = void 0;
const DEVHOST = '/';
const HOST = DEVHOST;
class AppConnect {
    constructor(host) {
        this.host = '/';
        this.host = host;
    }
    getProdFolders(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield fetch(this.host + url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({})
            });
            return yield resp.json();
        });
    }
    getProductByCats(url, uri) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestData = { URISklad: uri };
            const resp = yield fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(requestData)
            });
            const result = yield resp.json();
            return result;
        });
    }
}
exports.AppConnect = AppConnect;
exports.appcn = new AppConnect(HOST);


/***/ }),

/***/ "./public/src/ResultHolder.ts/ResultHolder.ts":
/*!****************************************************!*\
  !*** ./public/src/ResultHolder.ts/ResultHolder.ts ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, exports) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResultHolder = exports.Holder = void 0;
class Holder {
    constructor(name, data) {
        this.name = name;
        this.hold = [];
        this.data = data;
    }
    set data(d) {
        if (Array.isArray(d)) {
            this.hold.length = 0;
            this.hold = [...d];
        }
    }
    get data() {
        if (this.hold) {
            return { name: this.name, arrData: this.hold };
        }
        return { name: '', arrData: [] };
    }
}
exports.Holder = Holder;
class ResultHolder {
    constructor(client) {
        this.client = client;
    }
    execute(holder) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.client) {
                yield this.client.executeCallback(holder);
            }
        });
    }
}
exports.ResultHolder = ResultHolder;


/***/ }),

/***/ "./public/src/concreteCommands/BaseCommand.ts":
/*!****************************************************!*\
  !*** ./public/src/concreteCommands/BaseCommand.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseCommand = void 0;
class BaseCommand {
    constructor(reciever) {
        this.reciever = reciever;
        this.respExecute = null;
    }
    getResponse() {
        const returnResponse = this.respExecute;
        return returnResponse;
    }
}
exports.BaseCommand = BaseCommand;


/***/ }),

/***/ "./public/src/concreteCommands/GetAllProdsByPathName.ts":
/*!**************************************************************!*\
  !*** ./public/src/concreteCommands/GetAllProdsByPathName.ts ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetAllProdsByPathName = void 0;
const BaseCommand_1 = __webpack_require__(/*! ./BaseCommand */ "./public/src/concreteCommands/BaseCommand.ts");
/**
 * Команда. Получить список продукции по URI pathName
 * МойСклад/Продукция Плиточка
 */
class GetAllProdsByPathName extends BaseCommand_1.BaseCommand {
    constructor(reciever) {
        super(reciever);
    }
    execute(url, uri) {
        return __awaiter(this, void 0, void 0, function* () {
            this.respExecute = (yield this.reciever.getProductByCats(url, uri));
            return this.getResponse();
        });
    }
}
exports.GetAllProdsByPathName = GetAllProdsByPathName;


/***/ }),

/***/ "./public/src/concreteCommands/GetAllProductFolder.ts":
/*!************************************************************!*\
  !*** ./public/src/concreteCommands/GetAllProductFolder.ts ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetAllProductFolder = void 0;
const BaseCommand_1 = __webpack_require__(/*! ./BaseCommand */ "./public/src/concreteCommands/BaseCommand.ts");
/**
 * Команда получения списка разделов (категорий)
 * МойСклад/Продукция Плиточка
 */
class GetAllProductFolder extends BaseCommand_1.BaseCommand {
    constructor(reciever) {
        super(reciever);
    }
    execute(uri) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.reciever.getProdFolders(uri);
        });
    }
}
exports.GetAllProductFolder = GetAllProductFolder;


/***/ }),

/***/ "./public/src/dom.ts":
/*!***************************!*\
  !*** ./public/src/dom.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.dom = void 0;
const GetAllProdsByPathName_1 = __webpack_require__(/*! ./concreteCommands/GetAllProdsByPathName */ "./public/src/concreteCommands/GetAllProdsByPathName.ts");
const AppConnect_1 = __webpack_require__(/*! ./AppConnect */ "./public/src/AppConnect.ts");
const GetAllProductFolder_1 = __webpack_require__(/*! ./concreteCommands/GetAllProductFolder */ "./public/src/concreteCommands/GetAllProductFolder.ts");
const ResultHolder_1 = __webpack_require__(/*! ./ResultHolder.ts/ResultHolder */ "./public/src/ResultHolder.ts/ResultHolder.ts");
exports.dom = (() => {
    /**
     * Получить от сервера список раздеров МойСклад->Продукция Плиточка,
     * Создать список li a разделов, назначить колбеки получения результата,
     * результат отдать объекту ResultHolder
     * @param idcontainer id <div> контейнера в котором создадутся списки
     * @param invoker отправитель команд
     */
    function createListCats(idcontainer, table, invoker) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = '/getProductByCats';
            const cnt = document.getElementById(idcontainer);
            invoker.setGetProdByCats(new GetAllProdsByPathName_1.GetAllProdsByPathName(AppConnect_1.appcn));
            invoker.setAllProductsFolder(new GetAllProductFolder_1.GetAllProductFolder(AppConnect_1.appcn));
            const arrCats = yield invoker.getAllProdFolder('allProdFolder');
            const resultHolder = new ResultHolder_1.ResultHolder(table);
            arrCats.forEach((el) => {
                const a = document.createElement('A');
                a.classList.add('list-group-item', 'list-group-item-action', 'list-group-item-success');
                a.href = url;
                a.textContent = el;
                a.addEventListener('click', (e) => __awaiter(this, void 0, void 0, function* () {
                    if (e.target.nodeName === 'A') {
                        e.preventDefault();
                        const uri = e.target.textContent;
                        const result = yield invoker.сallbackGetProdByCats(url, uri);
                        // debugger;
                        const holder = new ResultHolder_1.Holder(uri, result);
                        yield resultHolder.execute(holder);
                    }
                }));
                cnt.appendChild(a);
            });
        });
    }
    /**
     * Создать и вернуть контейнерный Html элемент
     * @param id
     * @returns
     */
    function createContainer(id) {
        const cnt = document.getElementById(id);
        return (cnt) ? cnt : null;
    }
    /**
     * Создать и вернуть таблицу данных
     * @param arrData массив с данными
     * @returns
     */
    function makeTable(arrData) {
        return __awaiter(this, void 0, void 0, function* () {
            const table = document.createElement('table');
            table.classList.add('table', 'table-striped', 'table-sm', 'custom-style-table');
            // ---------- шея -----------------------------------
            const thead = document.createElement('thead');
            thead.classList.add('thead-light');
            const tr = document.createElement('tr');
            const titleTable = ['№', 'название', 'цвет', 'артикль', 'код', 'категория',];
            titleTable.forEach((v) => {
                const th = document.createElement('th');
                th.textContent = v;
                tr.appendChild(th);
            });
            thead.appendChild(tr);
            table.appendChild(thead);
            // ---------- тело ----------------------------------
            const tbody = document.createElement('tbody');
            arrData.forEach((val, i) => {
                const data = val;
                const tr = document.createElement('tr');
                for (let cellName of ['' + (i + 1), data.name || '', data.color || '', data.article || '',
                    data.code || '', data.pathName || '']) {
                    const td = document.createElement('td');
                    td.textContent = cellName;
                    tr.appendChild(td);
                }
                tbody.appendChild(tr);
            });
            table.appendChild(tbody);
            return table;
        });
    }
    const publicApi = { createListCats, createContainer, makeTable };
    return publicApi;
})();


/***/ }),

/***/ "./public/src/invoke/Invoker.ts":
/*!**************************************!*\
  !*** ./public/src/invoke/Invoker.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.invoker = exports.Invoker = void 0;
/**
 * Отправитель команд. Содержит команды приложения.
 */
class Invoker {
    constructor() {
        this.allProductsFolder = null; // категории (разделы) продукций МойСклад
        this.productByCats = null; // список товаров определенной категории (раздела МойСклад)
    }
    /**
     * -----------------------------------------------------------------------
     * @param command Установить команду получения всех товаров
     * из моего склада по определенному URI
     */
    setGetProdByCats(command) {
        this.productByCats = command;
    }
    сallbackGetProdByCats(url, uri) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (this.productByCats) ? yield this.productByCats.execute(url, uri) : null;
            return (result) ? result : [];
        });
    }
    /**
     * ----------------------------------------------------------------------
     * @param command Установить команду получения
     * всех категорий (разделов) продукции МойСклад
     */
    setAllProductsFolder(command) {
        this.allProductsFolder = command;
    }
    getAllProdFolder(uri) {
        return __awaiter(this, void 0, void 0, function* () {
            return (this.allProductsFolder) ? yield this.allProductsFolder.execute(uri) : [];
        });
    }
}
exports.Invoker = Invoker;
exports.invoker = new Invoker();


/***/ }),

/***/ "./public/src/page/TableProducts.ts":
/*!******************************************!*\
  !*** ./public/src/page/TableProducts.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TableProducts = exports.ClientData = void 0;
const dom_1 = __webpack_require__(/*! ../dom */ "./public/src/dom.ts");
// import { MinimizeResponseListProds } from "../types/TypesFrontend";
class ClientData {
    constructor() {
        this.cnt = null; // динамический div контейнер для таблицы 
    }
    fillContainer(obj) {
        if (this.cnt)
            this.cnt.appendChild(obj);
    }
    clearContainer() {
        if (this.cnt)
            for (let domElem of Array.from(this.cnt.children)) {
                this.cnt.removeChild(domElem);
            }
    }
}
exports.ClientData = ClientData;
/**
 * Порядок: экзмпл ClientData управляет своим содержимым.
 * у него есть объект-контейнер html и колбек-метод.
 * Сначала где-то получаю данные из сервера вызовом команды Command, данные превращаю в
 * объект Holder<T>, потом его отдаю на выполнение ResultHolder.execute(holder),
 * последний в  свою очередь вызывает метод executeCallback<T>(holder: Holder<T>)
 * у ClientData
 */
class TableProducts extends ClientData {
    constructor(id) {
        super();
        const c = dom_1.dom.createContainer(id);
        this.cnt = (c) ? c : null;
    }
    /**
     * Callback. Создать таблицу.
     * @param holder результат из мойсклад
     */
    executeCallback(holder) {
        return __awaiter(this, void 0, void 0, function* () {
            const arrdata = holder.data.arrData;
            const tbl = yield dom_1.dom.makeTable(arrdata);
            this.clearContainer();
            this.fillContainer(tbl);
            const who = document.getElementById('id-label-table-list-from');
            who.textContent = holder.name + ` [всего: ${arrdata.length}]`;
        });
    }
}
exports.TableProducts = TableProducts;


/***/ }),

/***/ "./public/src/types/EnumPageName.ts":
/*!******************************************!*\
  !*** ./public/src/types/EnumPageName.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EnumPageName = void 0;
/**
 * Имена name: <a name='xxx' href="..." >
 * ссылок меню навигации (страниц)
 */
var EnumPageName;
(function (EnumPageName) {
    EnumPageName["OPRIHOD"] = "OPRIHOD";
    EnumPageName["ALLPROD"] = "ALL_PROD";
})(EnumPageName || (exports.EnumPageName = EnumPageName = {}));
;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./public/index.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=app.js.map