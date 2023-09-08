/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./public/enter.ts":
/*!*************************!*\
  !*** ./public/enter.ts ***!
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
window.Telegram.WebApp.ready();
window.Telegram.WebApp.expand();
(() => __awaiter(void 0, void 0, void 0, function* () {
    const initData = Telegram.WebApp.initDataUnsafe || {};
    const respdata = yield AppConnect_1.appcn.sendTelegramData(initData);
    if (respdata.status > 0) {
        window.location.href = AppConnect_1.HOST + respdata.href;
    }
    const henter = document.getElementById('henter');
    const pwait = document.getElementById('pwait');
    henter.textContent = "Доступ запрещен.";
    pwait.textContent = "Войдите через телеграм-бот.";
}))();


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
const DEVHOST = 'https://foregor.vercel.app/';
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
/******/ 	var __webpack_exports__ = __webpack_require__("./public/enter.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=enter.js.map