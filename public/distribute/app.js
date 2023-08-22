/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./public/index.js":
/*!*************************!*\
  !*** ./public/index.js ***!
  \*************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_AppConnect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/AppConnect */ "./public/src/AppConnect.js");
/* harmony import */ var _src_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/dom */ "./public/src/dom.js");


const linksCat = '/getProductByCats';
const idContainerCats = 'div-categories';
const getData = async url => {
  const data = await _src_AppConnect__WEBPACK_IMPORTED_MODULE_0__.appcn.getProdFolders(url);
  return data;
};
const d = await getData('allProdFolder');
_src_dom__WEBPACK_IMPORTED_MODULE_1__.dom.createListCats(d, idContainerCats, linksCat, _src_AppConnect__WEBPACK_IMPORTED_MODULE_0__.appcn.getProductByCats);

/**
 * v - vertex - вершина графа
 * e - edge - ребро
 */
// class EdgeSetGraph {
//     _rootV = '';
//     _v = new Set();
//     _nbrs = {};

//     constructor(rootV, v=[], e=[]) {
//         this._rootV = rootV;
//         v.forEach(value => {
//             this.addVertex(value);
//         });

//         e.forEach(value => {
//             let u = null;
//             let v = null;
//             if (Array.isArray(value) && value.length > 1) {
//                 u = value[0];
//                 v = value[1];
//                 this.addEdge(u, v);
//             }
//         });
//     }

//     *edges() {
//         for (let u of this._v) {
//             for (let v of this._nbrs[u]) {
//                 yield [u, v];
//             }
//         }
//     }

//     getNbrs() {
//         return this._nbrs;
//     }

//     isContains(v) {
//         return v in this._nbrs;
//     }

//     addVertex(value) {
//         this._v.add(value);
//         this._nbrs[value] = new Set();
//     }

//     addEdge(u, v) {
//         const newEdge = [u, v];
//         if (!(u in this._nbrs))
//             this.addVertex(u);

//         this._nbrs[u].add(newEdge);
//     }
// }

// const x = (() => {
//     const folds = [
//         "Продукция Плиточка/Товары из Продукция Плиточка",
//         "Продукция Плиточка/Блоки заборные",
//         "Продукция Плиточка/Тротуарная плитка",
//         "Продукция Плиточка/Бордюры",
//         "Продукция Плиточка/Крышки",
//         "Продукция Плиточка/Ххх"
//     ];
//     const pathes = [
//         "Продукция Плиточка/Крышки/Крышки Некондиция",
//         "Продукция Плиточка/Тротуарная плитка/Вибролитье",
//         "Продукция Плиточка/Тротуарная плитка/Вибропресс",
//         "Продукция Плиточка/Тротуарная плитка/Вибропресс/Старый город",
//         "Продукция Плиточка/Тротуарная плитка/Вибролитье/Старая плитка",
//         "Продукция Плиточка/Тротуарная плитка/Вибропресс/Лофт",
//         "Продукция Плиточка/Тротуарная плитка/Вибропресс/Кирпичик 20.10.6",
//         "Продукция Плиточка/Тротуарная плитка/Вибропресс/Новый город",
//         "Продукция Плиточка/Тротуарная плитка/Вибропресс/Новый город/ПАЛЕРМО",
//         "Продукция Плиточка/Тротуарная плитка/Вибропресс/Новый город/Новый город наши"
//     ]

//     function createTree() {
//         const result = {};
//         const bucket = []
//         pathes.forEach((v, i) => {
//             let arrV = v.split('/');
//             let lenArrV = arrV.length;
//             let aval = arrV.slice(1, lenArrV);

//             makeRecursiveTree(bucket, aval);

//         });
//         const res =  bucket.filter(v => {
//             return v && Object.keys(v).length > 0;
//         });
//         return res
//     }

//     function makeRecursiveTree(bucket, p) {
//         if (p.length === 0) {
//             return {};
//         }

//         const len = p.length;
//         let x = {};

//         if (len > 1) {
//             x.tnode = 'folder';
//             x[p[0]] = p[1]
//         } else {
//             x.tnode = 'leaf';
//             x[p[0]] = p[0]
//         }

//         bucket.push(x);
//         return  bucket.push(makeRecursiveTree(bucket, p.slice(1, len)));
//     }

//     return { createTree };

// })();

// let a = x.createTree();
// let c = 1;
// for (let i of a) {
//     console.log(`№ ${c}: `, i); c++;
// }
// debugger;  
/**
 * 
 *  const folds = [
        "Продукция Плиточка/Товары из Продукция Плиточка",
        "Продукция Плиточка/Блоки заборные",
        "Продукция Плиточка/Тротуарная плитка",
        "Продукция Плиточка/Бордюры",
        "Продукция Плиточка/Крышки",
        "Продукция Плиточка/Ххх"
    ];
    const pathes = [
        "Продукция Плиточка/Крышки/Крышки Некондиция",
        "Продукция Плиточка/Тротуарная плитка/Вибролитье",
        "Продукция Плиточка/Тротуарная плитка/Вибропресс",
        "Продукция Плиточка/Тротуарная плитка/Вибропресс/Старый город",
        "Продукция Плиточка/Тротуарная плитка/Вибролитье/Старая плитка",
        "Продукция Плиточка/Тротуарная плитка/Вибропресс/Лофт",
        "Продукция Плиточка/Тротуарная плитка/Вибропресс/Кирпичик 20.10.6",
        "Продукция Плиточка/Тротуарная плитка/Вибропресс/Новый город",
        "Продукция Плиточка/Тротуарная плитка/Вибропресс/Новый город/ПАЛЕРМО",
        "Продукция Плиточка/Тротуарная плитка/Вибропресс/Новый город/Новый город наши"
    ]
 */
// const graph = new EdgeSetGraph('Продукция Плиточка', 
// ['Товары из Продукция Плиточка', 
// 'Блоки заборные',
// 'Тротуарная плитка',
// 'Бордюры',
// 'Крышки'],
// [
// ['Тротуарная плитка', 'Вибропресс'],
// ['Тротуарная плитка', 'Вибролитье'],
// ['Вибролитье', 'Старая плитка'],
// ['Вибропресс', 'Лофт'],
// ['Вибропресс', 'Новый город'],
// ['Новый город', 'ПАЛЕРМО']
// ]);

// for (let a of graph.edges()) {
//     console.log(a);
// }
// console.log(graph.getNbrs())

// -------------------------------------------------------------------------
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } }, 1);

/***/ }),

/***/ "./public/src/AppConnect.js":
/*!**********************************!*\
  !*** ./public/src/AppConnect.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   appcn: () => (/* binding */ appcn)
/* harmony export */ });
const DEVHOST = '/';
const HOST = DEVHOST;
class AppConnect {
  host = '/';
  constructor(host) {
    this.host = host;
  }
  async getProdFolders(url) {
    const resp = await fetch(this.host + url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({})
    });
    return await resp.json();
  }
  async getProductByCats(url, uri) {
    const requestData = {
      URISklad: uri
    };
    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(requestData)
    });
    const result = await resp.json();
    console.log(result);
  }
}
const appcn = new AppConnect(HOST);

/***/ }),

/***/ "./public/src/dom.js":
/*!***************************!*\
  !*** ./public/src/dom.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   dom: () => (/* binding */ dom)
/* harmony export */ });
const dom = (() => {
  function createListCats(arrCats, idcontainer, url, callbackAction) {
    const cnt = document.getElementById(idcontainer);
    arrCats.forEach((el, i) => {
      const a = document.createElement('A');
      a.classList.add('list-group-item', 'list-group-item-action', 'list-group-item-success');
      a.href = url;
      a.textContent = el;
      a.addEventListener('click', async e => {
        if (e.target.nodeName === 'A') {
          e.preventDefault();
          await callbackAction.call(this, url, e.target.textContent);
        }
      });
      cnt.appendChild(a);
    });
  }
  const publicApi = {
    createListCats
  };
  return publicApi;
})();

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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/async module */
/******/ 	(() => {
/******/ 		var webpackQueues = typeof Symbol === "function" ? Symbol("webpack queues") : "__webpack_queues__";
/******/ 		var webpackExports = typeof Symbol === "function" ? Symbol("webpack exports") : "__webpack_exports__";
/******/ 		var webpackError = typeof Symbol === "function" ? Symbol("webpack error") : "__webpack_error__";
/******/ 		var resolveQueue = (queue) => {
/******/ 			if(queue && queue.d < 1) {
/******/ 				queue.d = 1;
/******/ 				queue.forEach((fn) => (fn.r--));
/******/ 				queue.forEach((fn) => (fn.r-- ? fn.r++ : fn()));
/******/ 			}
/******/ 		}
/******/ 		var wrapDeps = (deps) => (deps.map((dep) => {
/******/ 			if(dep !== null && typeof dep === "object") {
/******/ 				if(dep[webpackQueues]) return dep;
/******/ 				if(dep.then) {
/******/ 					var queue = [];
/******/ 					queue.d = 0;
/******/ 					dep.then((r) => {
/******/ 						obj[webpackExports] = r;
/******/ 						resolveQueue(queue);
/******/ 					}, (e) => {
/******/ 						obj[webpackError] = e;
/******/ 						resolveQueue(queue);
/******/ 					});
/******/ 					var obj = {};
/******/ 					obj[webpackQueues] = (fn) => (fn(queue));
/******/ 					return obj;
/******/ 				}
/******/ 			}
/******/ 			var ret = {};
/******/ 			ret[webpackQueues] = x => {};
/******/ 			ret[webpackExports] = dep;
/******/ 			return ret;
/******/ 		}));
/******/ 		__webpack_require__.a = (module, body, hasAwait) => {
/******/ 			var queue;
/******/ 			hasAwait && ((queue = []).d = -1);
/******/ 			var depQueues = new Set();
/******/ 			var exports = module.exports;
/******/ 			var currentDeps;
/******/ 			var outerResolve;
/******/ 			var reject;
/******/ 			var promise = new Promise((resolve, rej) => {
/******/ 				reject = rej;
/******/ 				outerResolve = resolve;
/******/ 			});
/******/ 			promise[webpackExports] = exports;
/******/ 			promise[webpackQueues] = (fn) => (queue && fn(queue), depQueues.forEach(fn), promise["catch"](x => {}));
/******/ 			module.exports = promise;
/******/ 			body((deps) => {
/******/ 				currentDeps = wrapDeps(deps);
/******/ 				var fn;
/******/ 				var getResult = () => (currentDeps.map((d) => {
/******/ 					if(d[webpackError]) throw d[webpackError];
/******/ 					return d[webpackExports];
/******/ 				}))
/******/ 				var promise = new Promise((resolve) => {
/******/ 					fn = () => (resolve(getResult));
/******/ 					fn.r = 0;
/******/ 					var fnQueue = (q) => (q !== queue && !depQueues.has(q) && (depQueues.add(q), q && !q.d && (fn.r++, q.push(fn))));
/******/ 					currentDeps.map((dep) => (dep[webpackQueues](fnQueue)));
/******/ 				});
/******/ 				return fn.r ? promise : getResult();
/******/ 			}, (err) => ((err ? reject(promise[webpackError] = err) : outerResolve(exports)), resolveQueue(queue)));
/******/ 			queue && queue.d < 0 && (queue.d = 0);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module used 'module' so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./public/index.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=app.js.map