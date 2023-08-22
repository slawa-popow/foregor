import { appcn } from "./src/AppConnect";
import { dom } from "./src/dom"; 

const linksCat = '/getProductByCats';
const idContainerCats = 'div-categories';

const getData = async (url) => {
    const data = await appcn.getProdFolders(url);
    return data;
};

const d = await getData('allProdFolder');
dom.createListCats(d, idContainerCats, linksCat, appcn.getProductByCats);














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
