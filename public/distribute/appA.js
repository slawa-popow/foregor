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
exports.clientTableOptihod = void 0;
const AppConnect_1 = __webpack_require__(/*! ./src/AppConnect */ "./public/src/AppConnect.ts");
const ResultHolder_1 = __webpack_require__(/*! ./src/ResultHolder.ts/ResultHolder */ "./public/src/ResultHolder.ts/ResultHolder.ts");
const GetAllFromTableOprihod_1 = __webpack_require__(/*! ./src/concreteCommands/GetAllFromTableOprihod */ "./public/src/concreteCommands/GetAllFromTableOprihod.ts");
const GetAllProductFolder_1 = __webpack_require__(/*! ./src/concreteCommands/GetAllProductFolder */ "./public/src/concreteCommands/GetAllProductFolder.ts");
const Oprihod_1 = __webpack_require__(/*! ./src/concreteCommands/Oprihod */ "./public/src/concreteCommands/Oprihod.ts");
const dom_1 = __webpack_require__(/*! ./src/dom */ "./public/src/dom.ts");
const Invoker_1 = __webpack_require__(/*! ./src/invoke/Invoker */ "./public/src/invoke/Invoker.ts");
const clients_1 = __webpack_require__(/*! ./src/page/clients */ "./public/src/page/clients.ts");
const EnumPageName_1 = __webpack_require__(/*! ./src/types/EnumPageName */ "./public/src/types/EnumPageName.ts");
const datep = document.getElementById('currenttime');
setInterval(() => {
    if (datep)
        datep.textContent = 'Таблица оприходования ' +
            new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" });
}, 1000);
(() => {
    const inputCount = document.getElementById("sel-count");
    if (inputCount) {
        inputCount.addEventListener("keyup", function () {
            const input = this;
            input.value = input.value.replace(/[^\d]/g, "");
            if (input.value.length > 7) {
                const chank = [...input.value].slice(0, 6);
                input.value = chank.join('');
            }
        });
    }
})();
const idContainerCats = 'div-categories';
const cntAllprd = document.getElementById('li-menu-allprod');
const cntOprihod = document.getElementById('li-menu-oprihod');
const sendFormOprihodButton = document.getElementById('input-product');
sendFormOprihodButton === null || sendFormOprihodButton === void 0 ? void 0 : sendFormOprihodButton.addEventListener('click', dom_1.dom.clbSendFormOprihod);
const clientFillselPathName = new clients_1.FillSelectPathNames('sel-pathName'); // клиент select thml "Категории"
exports.clientTableOptihod = new clients_1.AllDataTableOprihod('contain-table-oprihod');
// оприходовать
Invoker_1.invoker.setCommandOprihod(new Oprihod_1.Oprihod(AppConnect_1.appcn));
const clientResOprihod = new clients_1.AnswerOprihod("oprihodinfo");
const answerResHolder = new ResultHolder_1.ResultHolder(clientResOprihod);
const btnOprihod = document.getElementById('input-oprihod');
btnOprihod === null || btnOprihod === void 0 ? void 0 : btnOprihod.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    dom_1.dom.loadImage(true, 'loadoprihod');
    dom_1.dom.textMessage('oprihodinfo', 'оприходование в МойСклад...');
    const isCheckSend = document.getElementById('issendsklad');
    const ischeck = isCheckSend.checked;
    const res = yield Invoker_1.invoker.sendOprihod({ who: "admin", role: "admin", isSendSklad: ischeck });
    const rHolder = new ResultHolder_1.Holder('answerOprihod', res);
    answerResHolder.execute(rHolder);
    dom_1.dom.loadImage(false, 'loadoprihod');
    dom_1.dom.textMessage('oprihodinfo');
}));
/**
 * старт при загрузке стр.
 */
const firstStart = () => __awaiter(void 0, void 0, void 0, function* () {
    Invoker_1.invoker.setAllProductsFolder(new GetAllProductFolder_1.GetAllProductFolder(AppConnect_1.appcn)); // установить команду получения списка категорий
    const arrCats = yield Invoker_1.invoker.getAllProdFolder('allProdFolder'); // получить список категорий по команде
    const holderSelPathName = new ResultHolder_1.ResultHolder(clientFillselPathName); // создать хранителя результата вып-я команды
    const holder = new ResultHolder_1.Holder('sel-pathName', arrCats); // объект результата вып-я команды
    yield holderSelPathName.execute(holder); // хранитель отдает результат клиенту (здесь select html)
    Invoker_1.invoker.setGetAllDataTableOprihod(new GetAllFromTableOprihod_1.GetAllFromTableOprihod(AppConnect_1.appcn));
    const tableDataOpr = yield Invoker_1.invoker.getAllDataTableOprihod();
    const holderTableOprh = new ResultHolder_1.ResultHolder(exports.clientTableOptihod);
    const holderTO = new ResultHolder_1.Holder('holderFirstStart', tableDataOpr);
    holderTableOprh.execute(holderTO);
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
const dwnl = document.getElementById('input-downloadfile');
dwnl.addEventListener('click', (e) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        e.preventDefault();
        const blob = yield AppConnect_1.appcn.getExcelFile();
        if (blob) {
            const file = window.URL.createObjectURL(blob);
            window.location.assign(file);
        }
    }
    catch (e) {
        console.log('error download file', e);
    }
}));


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
exports.appcn = exports.AppConnect = exports.HOST = void 0;
const DEVHOST = 'https://foregor.vercel.app/work/';
// const DEVHOST = '/';
exports.HOST = DEVHOST;
class AppConnect {
    constructor(host) {
        this.host = exports.HOST;
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
    getExcelFile() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield fetch(this.host + 'getOprihodsExcel', { method: 'POST' });
                return resp.blob();
            }
            catch (e) {
                console.log('error AppConnect -> getExcelFile()');
            }
            return null;
        });
    }
    // получить товары по pathName
    getProductByCats(url, uri) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestData = { URISklad: uri };
            const resp = yield fetch(this.host + url, {
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
    // отправить форму оприход
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
    // Кнопка оприходовать
    doOprihod(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(this.host + 'doOprihod', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(data)
            });
            const result = yield response.json();
            return result;
        });
    }
    // получить таблицу добавленных продуктов
    getTableOprihod() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(this.host + 'getTableOprihod', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({})
            });
            const result = yield response.json();
            return result;
        });
    }
    deleteRow(idrow) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(this.host + 'deleteRow', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({ delId: idrow })
            });
            const result = yield response.json();
            return result;
        });
    }
    // получить списки цвет и название по pathName для select-ов
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
    // отправка на сервер данных от телеграм /////тест
    sendTelegramData(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield fetch(this.host + 'fromTelegram', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(data)
            });
            const result = yield resp.json();
            return result;
        });
    }
}
exports.AppConnect = AppConnect;
exports.appcn = new AppConnect(exports.HOST);


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

/***/ "./public/src/concreteCommands/CmdDeleteRowTableOprihod.ts":
/*!*****************************************************************!*\
  !*** ./public/src/concreteCommands/CmdDeleteRowTableOprihod.ts ***!
  \*****************************************************************/
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
exports.CmdDeleteRowTableOprihod = void 0;
const BaseCommand_1 = __webpack_require__(/*! ./BaseCommand */ "./public/src/concreteCommands/BaseCommand.ts");
/**
 * Удалить строку таблицы оприходования
 *
 */
class CmdDeleteRowTableOprihod extends BaseCommand_1.BaseCommand {
    constructor(reciever) {
        super(reciever);
    }
    execute(idrow) {
        return __awaiter(this, void 0, void 0, function* () {
            this.respExecute = (yield this.reciever.deleteRow(idrow)); //appcnt
            return this.getResponse();
        });
    }
}
exports.CmdDeleteRowTableOprihod = CmdDeleteRowTableOprihod;


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

/***/ "./public/src/concreteCommands/GetAllFromTableOprihod.ts":
/*!***************************************************************!*\
  !*** ./public/src/concreteCommands/GetAllFromTableOprihod.ts ***!
  \***************************************************************/
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
exports.GetAllFromTableOprihod = void 0;
const BaseCommand_1 = __webpack_require__(/*! ./BaseCommand */ "./public/src/concreteCommands/BaseCommand.ts");
/**
 * Команда. Получить всю таблицу добавленной продукции для оприходования
 */
class GetAllFromTableOprihod extends BaseCommand_1.BaseCommand {
    constructor(reciever) {
        super(reciever);
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            this.respExecute = (yield this.reciever.getTableOprihod());
            return this.getResponse();
        });
    }
}
exports.GetAllFromTableOprihod = GetAllFromTableOprihod;


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

/***/ "./public/src/concreteCommands/Oprihod.ts":
/*!************************************************!*\
  !*** ./public/src/concreteCommands/Oprihod.ts ***!
  \************************************************/
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
exports.Oprihod = void 0;
const BaseCommand_1 = __webpack_require__(/*! ./BaseCommand */ "./public/src/concreteCommands/BaseCommand.ts");
/**
 * Оприходовать таблицу в МойСклад
 *
 */
class Oprihod extends BaseCommand_1.BaseCommand {
    constructor(reciever) {
        super(reciever);
    }
    execute(data) {
        return __awaiter(this, void 0, void 0, function* () {
            this.respExecute = (yield this.reciever.doOprihod(data)); //appcnt
            return this.getResponse();
        });
    }
}
exports.Oprihod = Oprihod;


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
const __1 = __webpack_require__(/*! .. */ "./public/index.ts");
const CmdDeleteRowTableOprihod_1 = __webpack_require__(/*! ./concreteCommands/CmdDeleteRowTableOprihod */ "./public/src/concreteCommands/CmdDeleteRowTableOprihod.ts");
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
            const url = 'getProductByCats';
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
                const shortSplitPathName = v.split('/');
                const shortPname = shortSplitPathName.slice(shortSplitPathName.length - 2, shortSplitPathName.length).join('/');
                option.textContent = shortPname;
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
            const names = ["sellist-pathName", "sellist-name", "sellist-article", "sellist-color", "sellist-count", "sellist-photo"];
            const fdata = new FormData();
            let i = 0;
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
            const currDate = new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" });
            const dt = currDate.split(',');
            fdata.append('date', dt[0].trim());
            fdata.append('time', dt[1].trim());
            loadImage(true, 'loadstate');
            textMessage('errinfo', 'Отправка данных...');
            Invoker_1.invoker.setSendFormOprihod(cmdSendDataFormOprihod);
            const result = yield Invoker_1.invoker.sendDataFormOprihod(fdata);
            if (Array.isArray(result) && result.length === 1 && result[0].errors) {
                const msgarr = result[0].errors.map(v => { return v.message; }).join('; ');
                loadImage(false, 'loadstate');
                textMessage('errinfo', msgarr);
            }
            else {
                loadImage(false, 'loadstate');
                textMessage('errinfo');
                const holderTableOprh = new ResultHolder_1.ResultHolder(__1.clientTableOptihod);
                const holderTO = new ResultHolder_1.Holder('holderFirstStart', result);
                yield holderTableOprh.execute(holderTO);
            }
            const infile = document.getElementById('sel-photo');
            infile.value = '';
            // for (let [k, v] of fdata.entries()) {console.log(k, v)}
        });
    }
    const commandGetAttrColorName = new GetAttributesByPathName_1.GetAttributesByPathName(AppConnect_1.appcn); // команда получить цвет, имя по namePath
    const commandDelRow = new CmdDeleteRowTableOprihod_1.CmdDeleteRowTableOprihod(AppConnect_1.appcn);
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
     * Таблица оприходования
     */
    function makeOprihodTable(arrData) {
        return __awaiter(this, void 0, void 0, function* () {
            const table = document.createElement('table');
            table.classList.add('table', 'table-striped', 'table-bordered', 'table-sm', 'custom-style-table');
            // ---------- шея -----------------------------------
            const thead = document.createElement('thead');
            thead.classList.add('thead-light');
            const tr = document.createElement('tr'); //(name, color, count, pathName, date, time, photoPath)
            const titleTable = ['id', 'название', 'цвет', 'артикул', 'кол-во', 'из категории', 'дата', 'время', ''];
            titleTable.forEach((v) => {
                const th = document.createElement('th');
                th.textContent = v;
                tr.appendChild(th);
            });
            thead.appendChild(tr);
            table.appendChild(thead);
            const lastValPathName = (pathName) => {
                try {
                    const spl = pathName.split('/');
                    const len = spl.length;
                    return '../' + spl.slice(len - 1, len).join('/');
                }
                catch (e) { }
                return '';
            };
            // ---------- тело ----------------------------------
            const tbody = document.createElement('tbody');
            arrData.forEach((val) => {
                const data = val;
                const tr = document.createElement('tr');
                tr.addEventListener('click', (e) => __awaiter(this, void 0, void 0, function* () {
                    const elem = e.target;
                    if (elem instanceof HTMLAnchorElement) {
                        const rowId = elem.id.split('_')[1];
                        Invoker_1.invoker.setCmdDeleteRow(commandDelRow);
                        const resDel = yield Invoker_1.invoker.sendDeleteRowById(rowId);
                        const delHolder = new ResultHolder_1.Holder('delH' + rowId, resDel);
                        const resDelHolder = new ResultHolder_1.ResultHolder(__1.clientTableOptihod);
                        yield resDelHolder.execute(delHolder);
                    }
                }));
                for (let cellName of [data.products_id, data.name || '', data.color || '', data.article || '', data.count || '',
                    lastValPathName(data.pathName), data.date || '', data.time || '',]) {
                    const td = document.createElement('td');
                    td.textContent = '' + cellName;
                    tr.appendChild(td);
                }
                const a = document.createElement('A');
                a.setAttribute('id', `delrow_${data.id}`);
                a.classList.add('list-group-item', 'list-group-item-action', 'list-group-item-danger');
                a.textContent = 'удалить';
                tr.appendChild(a);
                tbody.appendChild(tr);
            });
            table.appendChild(tbody);
            return table;
        });
    }
    function answerOprihod(_cnt, arrdata) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('dom.answerOprihod():\n', arrdata);
        });
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
    /**
     * элементу с определенным id назначить текст
     * @param text message
     */
    function textMessage(id, text = '') {
        const textel = document.getElementById(id);
        textel.textContent = text;
    }
    /**
     * включить/выключить картинку загрузки
     * @param on
     */
    function loadImage(on, id) {
        const loadImg = document.getElementById(id);
        if (on) {
            loadImg === null || loadImg === void 0 ? void 0 : loadImg.classList.remove('noloadstate');
            loadImg === null || loadImg === void 0 ? void 0 : loadImg.classList.add('loadstate');
        }
        else {
            loadImg === null || loadImg === void 0 ? void 0 : loadImg.classList.remove('loadstate');
            loadImg === null || loadImg === void 0 ? void 0 : loadImg.classList.add('noloadstate');
        }
    }
    const publicApi = {
        createListCats, createContainer,
        makeTable, fillSelectPahtNamesOprihod,
        setCallbackSelect, delCallbackSelect,
        clbSelPathName, clbSendFormOprihod,
        loadImage, textMessage, makeOprihodTable,
        answerOprihod,
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
        this.getDataTableOprihod = null; // получить таблицу добавленных продуктов для оприходования
        this.deleteRowFromTable = null; // удалить строку из таблицы оприходований
        this.oprihod = null; // оприходовать
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
     * @param command Оприходовать таблицу в МойСклад
     */
    setCommandOprihod(command) {
        if (command)
            this.oprihod = command;
    }
    sendOprihod(oprihodData) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (this.oprihod) ? yield this.oprihod.execute(oprihodData) : null;
            return (result) ? result : [];
        });
    }
    /**
    * -----------------------------------------------------------------------
    * @param command удалить строку из таблицы оприходований
    */
    setCmdDeleteRow(command) {
        if (command)
            this.deleteRowFromTable = command;
    }
    sendDeleteRowById(rowId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (this.deleteRowFromTable) ? yield this.deleteRowFromTable.execute(rowId) : null;
            return (result) ? result : [];
        });
    }
    /**
    * -----------------------------------------------------------------------
    * @param command получить таблицу добавленных продуктов для оприходования
    */
    setGetAllDataTableOprihod(command) {
        if (command)
            this.getDataTableOprihod = command;
    }
    getAllDataTableOprihod() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (this.getDataTableOprihod) ? yield this.getDataTableOprihod.execute() : null;
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
exports.FillSelectName = exports.FillSelectColor = exports.AnswerOprihod = exports.FillSelectPathNames = exports.AllDataTableOprihod = exports.TableProducts = exports.ClientData = void 0;
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
 * Создает таблицу оприходования
 */
class AllDataTableOprihod extends ClientData {
    constructor(id) {
        super(id);
    }
    /**
     * Callback. Создать таблицу.
     * @param holder результат вернувш. таблица
     */
    executeCallback(holder) {
        return __awaiter(this, void 0, void 0, function* () {
            const arrdata = holder.data.arrData;
            const table = yield dom_1.dom.makeOprihodTable(arrdata);
            this.clearContainer();
            this.fillContainer(table);
            // const who = document.getElementById('id-label-table-list-from');
            // who!.textContent = holder.name + ` [всего: ${arrdata.length}]`;
        });
    }
}
exports.AllDataTableOprihod = AllDataTableOprihod;
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
 * Ответ сервера после оприходования
 */
class AnswerOprihod extends ClientData {
    constructor(idsel) {
        super(idsel);
    }
    executeCallback(holder) {
        return __awaiter(this, void 0, void 0, function* () {
            const arrdata = holder.data.arrData;
            if (this.cnt) {
                // this.clearContainer();
                yield dom_1.dom.answerOprihod(this.cnt, arrdata);
            }
            else {
                throw new Error("ERROR IN executeCallback<T>(holder) --> class AnswerOprihod ");
            }
        });
    }
}
exports.AnswerOprihod = AnswerOprihod;
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
//# sourceMappingURL=appA.js.map