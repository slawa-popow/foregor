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
const AppConnect_1 = __webpack_require__(/*! ./src/AppConnect */ "./public/src/AppConnect.ts");
const ResultHolder_1 = __webpack_require__(/*! ./src/ResultHolder.ts/ResultHolder */ "./public/src/ResultHolder.ts/ResultHolder.ts");
const GetAllProductFolder_1 = __webpack_require__(/*! ./src/concreteCommands/GetAllProductFolder */ "./public/src/concreteCommands/GetAllProductFolder.ts");
const dom_1 = __webpack_require__(/*! ./src/dom */ "./public/src/dom.ts");
const Invoker_1 = __webpack_require__(/*! ./src/invoke/Invoker */ "./public/src/invoke/Invoker.ts");
const clients_1 = __webpack_require__(/*! ./src/page/clients */ "./public/src/page/clients.ts");
const EnumPageName_1 = __webpack_require__(/*! ./src/types/EnumPageName */ "./public/src/types/EnumPageName.ts");
const idContainerCats = 'div-categories';
const cntAllprd = document.getElementById('li-menu-allprod');
const cntOprihod = document.getElementById('li-menu-oprihod');
const sendFormOprihodButton = document.getElementById('input-product');
sendFormOprihodButton === null || sendFormOprihodButton === void 0 ? void 0 : sendFormOprihodButton.addEventListener('click', dom_1.dom.clbSendFormOprihod);
const clientFillselPathName = new clients_1.FillSelectPathNames('sel-pathName'); // клиент select thml "Категории"
/**
 * старт при загрузке стр.
 */
const firstStart = () => __awaiter(void 0, void 0, void 0, function* () {
    Invoker_1.invoker.setAllProductsFolder(new GetAllProductFolder_1.GetAllProductFolder(AppConnect_1.appcn)); // установить команду получения списка категорий
    const arrCats = yield Invoker_1.invoker.getAllProdFolder('allProdFolder'); // получить список категорий по команде
    const holderSelPathName = new ResultHolder_1.ResultHolder(clientFillselPathName); // создать хранителя результата вып-я команды
    const holder = new ResultHolder_1.Holder('sel-pathName', arrCats); // объект результата вып-я команды
    yield holderSelPathName.execute(holder); // хранитель отдает результат клиенту (здесь select html)
});
if (cntOprihod && cntAllprd)
    for (let v of [cntOprihod, cntAllprd]) {
        v.addEventListener('click', (e) => __awaiter(void 0, void 0, void 0, function* () {
            const target = e.target;
            switch (target.name) {
                case EnumPageName_1.EnumPageName.OPRIHOD: {
                    yield firstStart();
                    break;
                }
                case EnumPageName_1.EnumPageName.ALLPROD: {
                    const table = new clients_1.TableProducts('table-container'); //ClientData
                    if (!table || (!table.cnt))
                        break;
                    yield dom_1.dom.createListCats(idContainerCats, table, Invoker_1.invoker);
                }
            }
        }));
    }
firstStart();


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
    getRespSendFormDataOprihod(formData) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(this.host + 'formOprihod', {
                method: 'POST',
                body: formData
            });
            const result = yield response.json();
            return result;
        });
    }
    getAttributesNameColorsByPathName(pathName) {
        return __awaiter(this, void 0, void 0, function* () {
            const reqData = { pathName: pathName };
            const resp = yield fetch(this.host + 'getAttrsByPath', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(reqData)
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

/***/ "./public/src/concreteCommands/CmdSendFormOprihod.ts":
/*!***********************************************************!*\
  !*** ./public/src/concreteCommands/CmdSendFormOprihod.ts ***!
  \***********************************************************/
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
exports.CmdSendFormOprihod = void 0;
const BaseCommand_1 = __webpack_require__(/*! ./BaseCommand */ "./public/src/concreteCommands/BaseCommand.ts");
/**
 * Отправить заполненную форму цвет имя кол-во фото
 * на сервер. получить таблицу
 */
class CmdSendFormOprihod extends BaseCommand_1.BaseCommand {
    constructor(reciever) {
        super(reciever);
    }
    execute(formData) {
        return __awaiter(this, void 0, void 0, function* () {
            this.respExecute = (yield this.reciever.getRespSendFormDataOprihod(formData)); //appcnt
            return this.getResponse();
        });
    }
}
exports.CmdSendFormOprihod = CmdSendFormOprihod;


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

/***/ "./public/src/concreteCommands/GetAttributesByPathName.ts":
/*!****************************************************************!*\
  !*** ./public/src/concreteCommands/GetAttributesByPathName.ts ***!
  \****************************************************************/
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
exports.GetAttributesByPathName = void 0;
const BaseCommand_1 = __webpack_require__(/*! ./BaseCommand */ "./public/src/concreteCommands/BaseCommand.ts");
/**
 * Команда. Получить атрибуты: имя, цвет по pathName
 * type: AttributesByPathName
 * (выбранный элемент списка select html "Категории")
 */
class GetAttributesByPathName extends BaseCommand_1.BaseCommand {
    constructor(reciever) {
        super(reciever);
    }
    execute(pathName) {
        return __awaiter(this, void 0, void 0, function* () {
            this.respExecute = (yield this.reciever.getAttributesNameColorsByPathName(pathName));
            return this.getResponse();
        });
    }
}
exports.GetAttributesByPathName = GetAttributesByPathName;


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
const Invoker_1 = __webpack_require__(/*! ./invoke/Invoker */ "./public/src/invoke/Invoker.ts");
const AppConnect_1 = __webpack_require__(/*! ./AppConnect */ "./public/src/AppConnect.ts");
const GetAllProductFolder_1 = __webpack_require__(/*! ./concreteCommands/GetAllProductFolder */ "./public/src/concreteCommands/GetAllProductFolder.ts");
const ResultHolder_1 = __webpack_require__(/*! ./ResultHolder.ts/ResultHolder */ "./public/src/ResultHolder.ts/ResultHolder.ts");
const clients_1 = __webpack_require__(/*! ./page/clients */ "./public/src/page/clients.ts");
const GetAttributesByPathName_1 = __webpack_require__(/*! ./concreteCommands/GetAttributesByPathName */ "./public/src/concreteCommands/GetAttributesByPathName.ts");
const CmdSendFormOprihod_1 = __webpack_require__(/*! ./concreteCommands/CmdSendFormOprihod */ "./public/src/concreteCommands/CmdSendFormOprihod.ts");
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
     * Наполнить выпадающий список. Данные получить
     * от мойсклад / db
     * @param select -- (#sel-pathName) объект выпадающего списка
     * @param listdata -- список значений для заполнения.
     *                 Первый из списка пустой/не пустой (emptyFirst: boolean).
     */
    function fillSelectPahtNamesOprihod(select, listdata, emptyFirst = true) {
        return __awaiter(this, void 0, void 0, function* () {
            const listd = [...listdata];
            if (emptyFirst)
                listd.unshift('---');
            listd.forEach((v, i) => {
                const option = document.createElement('option');
                option.setAttribute('id', `${select.id}_${i}`);
                option.setAttribute('value', v);
                option.textContent = v;
                select === null || select === void 0 ? void 0 : select.appendChild(option);
            });
        });
    }
    function setCallbackSelect(select, callb) {
        select.addEventListener('change', callb);
    }
    function delCallbackSelect(select, callb) {
        select.removeEventListener('change', callb);
    }
    const cmdSendDataFormOprihod = new CmdSendFormOprihod_1.CmdSendFormOprihod(AppConnect_1.appcn);
    /**
     * Отправка формы с данными оприходывания
     * @param e
     */
    function clbSendFormOprihod(e) {
        return __awaiter(this, void 0, void 0, function* () {
            e.preventDefault();
            const form = e.target.form;
            const names = ["sellist-pathName", "sellist-name", "sellist-color", "sellist-count", "sellist-photo"];
            const fdata = new FormData();
            let i = 0;
            // debugger;
            for (let el of form) {
                if (i > 4)
                    break;
                const name = names[i].split('-')[1];
                if (el instanceof HTMLSelectElement) {
                    const opts = el.childNodes;
                    let value = '';
                    for (let v of opts) {
                        if (v instanceof HTMLOptionElement && v.selected) {
                            value = v.value;
                            break;
                        }
                    }
                    fdata.append(name, value);
                }
                else if (el instanceof HTMLInputElement) {
                    if (el.type === 'file') {
                        const fls = el.files;
                        if (fls) {
                            for (let f of fls) {
                                fdata.append('file', f);
                            }
                        }
                    }
                    else {
                        const value = el.value;
                        fdata.append(name, value);
                    }
                }
                i += 1;
            }
            Invoker_1.invoker.setSendFormOprihod(cmdSendDataFormOprihod);
            const result = yield Invoker_1.invoker.sendDataFormOprihod(fdata);
            console.log('clb send form: \n', result);
            // for (let [k, v] of fdata.entries()) {console.log(k, v)}
        });
    }
    const commandGetAttrColorName = new GetAttributesByPathName_1.GetAttributesByPathName(AppConnect_1.appcn); // команда получить цвет, имя по namePath
    /**
     * Коллбек по выбору элемента списка "Категории"
     * @param e Event
     */
    function clbSelPathName(e) {
        return __awaiter(this, void 0, void 0, function* () {
            const opts = e.target.childNodes;
            Invoker_1.invoker.setGetAttrsColorName(commandGetAttrColorName);
            for (let el of opts) {
                if (el instanceof HTMLOptionElement && el.selected) {
                    const clientColor = new clients_1.FillSelectColor('sel-color');
                    const clientName = new clients_1.FillSelectName('sel-name');
                    const result = yield Invoker_1.invoker.getAttrsColorName(el.value);
                    const resultHolderColor = new ResultHolder_1.ResultHolder(clientColor);
                    const resultHolderName = new ResultHolder_1.ResultHolder(clientName);
                    const hldColor = new ResultHolder_1.Holder(result.pathName, result.colors);
                    const hldName = new ResultHolder_1.Holder(result.pathName, result.names);
                    yield resultHolderColor.execute(hldColor);
                    yield resultHolderName.execute(hldName);
                    break;
                }
            }
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
    const publicApi = {
        createListCats, createContainer,
        makeTable, fillSelectPahtNamesOprihod,
        setCallbackSelect, delCallbackSelect,
        clbSelPathName, clbSendFormOprihod,
    };
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
        this.colorNameByCategory = null; // атрибуты цветов и названий по выбранной (select html) категории
        this.sendFormOprihod = null; // отправить форму для добавления товара в таблицу 
    }
    /**
    * -----------------------------------------------------------------------
    * @param command Отправить заполненную форму цвет имя кол-во фото
    * на сервер. получить таблицу.
    */
    setSendFormOprihod(command) {
        if (!this.sendFormOprihod)
            this.sendFormOprihod = command;
    }
    sendDataFormOprihod(formData) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (this.sendFormOprihod) ? yield this.sendFormOprihod.execute(formData) : null;
            return (result) ? result : [];
        });
    }
    /**
     * -----------------------------------------------------------------------
     * @param command Установить команду получения атрибутов: имя, цвет по pathName
     * type: AttributesByPathName
     * (выбранный элемент списка select html "Категории")
     */
    setGetAttrsColorName(command) {
        this.colorNameByCategory = command;
    }
    getAttrsColorName(pathName) {
        return __awaiter(this, void 0, void 0, function* () {
            let attrs = { pathName: pathName, names: [''], colors: [''] };
            if (this.colorNameByCategory) {
                const result = yield this.colorNameByCategory.execute(pathName);
                if (Array.isArray(result) && result.length > 0)
                    return result[0];
            }
            return attrs;
        });
    }
    /**
     * -----------------------------------------------------------------------
     * @param command Установить команду получения всех товаров
     * из моего склада по определенному URI
     */
    setGetProdByCats(command) {
        if (!this.productByCats)
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
        if (!this.allProductsFolder)
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

/***/ "./public/src/page/clients.ts":
/*!************************************!*\
  !*** ./public/src/page/clients.ts ***!
  \************************************/
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
exports.FillSelectName = exports.FillSelectColor = exports.FillSelectPathNames = exports.TableProducts = exports.ClientData = void 0;
const dom_1 = __webpack_require__(/*! ../dom */ "./public/src/dom.ts");
// import { MinimizeResponseListProds } from "../types/TypesFrontend";
class ClientData {
    constructor(id) {
        this.cnt = null; // динамический div контейнер для таблицы 
        const c = dom_1.dom.createContainer(id);
        this.cnt = (c) ? c : null;
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
        super(id);
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
/**
 * Наполняет html select "Категории"
 */
class FillSelectPathNames extends ClientData {
    constructor(idsel) {
        super(idsel);
    }
    executeCallback(holder) {
        return __awaiter(this, void 0, void 0, function* () {
            const arrdata = holder.data.arrData;
            if (this.cnt) {
                dom_1.dom.delCallbackSelect(this.cnt, dom_1.dom.clbSelPathName);
                this.clearContainer();
                yield dom_1.dom.fillSelectPahtNamesOprihod(this.cnt, arrdata);
                dom_1.dom.setCallbackSelect(this.cnt, dom_1.dom.clbSelPathName);
            }
            else {
                throw new Error("ERROR IN executeCallback<T>(holder) --> class FillSelectPathNames ");
            }
        });
    }
}
exports.FillSelectPathNames = FillSelectPathNames;
/**
 * Наполняет html select "Цвет"
 */
class FillSelectColor extends ClientData {
    constructor(idsel) {
        super(idsel);
    }
    executeCallback(holder) {
        return __awaiter(this, void 0, void 0, function* () {
            const arrdata = holder.data.arrData;
            if (this.cnt) {
                this.clearContainer();
                yield dom_1.dom.fillSelectPahtNamesOprihod(this.cnt, arrdata, false);
            }
            else {
                throw new Error("ERROR IN executeCallback<T>(holder) --> class FillSelectColor ");
            }
        });
    }
}
exports.FillSelectColor = FillSelectColor;
/**
 * Наполняет html select "Название"
 */
class FillSelectName extends ClientData {
    constructor(idsel) {
        super(idsel);
    }
    executeCallback(holder) {
        return __awaiter(this, void 0, void 0, function* () {
            const arrdata = holder.data.arrData;
            if (this.cnt) {
                this.clearContainer();
                yield dom_1.dom.fillSelectPahtNamesOprihod(this.cnt, arrdata, false);
            }
            else {
                throw new Error("ERROR IN executeCallback<T>(holder) --> class FillSelectName ");
            }
        });
    }
}
exports.FillSelectName = FillSelectName;


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