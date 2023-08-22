import { DopAttributes, PatchesToProductList, PathNamePlitochka, ProductsByPathCats,  } from "../types/TypesMySklad";
// import { mySklad } from "../mysklad/MySklad";

export async function getPatchesToProductList(productFolders: PathNamePlitochka[]): Promise<PatchesToProductList[]> {
    let arrPathName = new Set();
    productFolders.forEach( (v: PathNamePlitochka) => {
        if (v.pathName.trim().length > 0) {
            const pn: PatchesToProductList = {pathName: v.pathName, name: v.name};
            arrPathName.add(pn);
        }
    });
    // let re = /\//gi;
    let result = Array.from(arrPathName) as Array<PatchesToProductList>;
    // let sortedResult = result.sort((a: PatchesToProductList, b: PatchesToProductList) => {
    //     return ((a.pathName + a.name).match(re) || []).length - ((b.pathName + b.name).match(re) || []).length;
    // });
    return result;
}



export async function createPathForGetProdList(arrNameGroup: PatchesToProductList[]): Promise<any> {
    const patchesCats: string[] = [];
    const allPatches: string[] = [];
    let re = /\//gi;
    arrNameGroup.forEach((v: PatchesToProductList) => {
        const uri = v.pathName + '/' + v.name;
        patchesCats.push(uri);
    });
    
    allPatches.push(...patchesCats);
    allPatches.sort((a: string, b: string) => {
        return (a.match(re) || []).length - (b.match(re) || []).length;
    });
    return allPatches;
}


export async function getMinimizeListProds(res: ProductsByPathCats[]): Promise<any[]> {
    const ATTR_NAME = 'Название';
    const ATTR_COLOR = 'Цвет';
    const result: any[] = [];
    for (let v of res) {
        const bucket: any = {};
        const attrs = v.attributes;
        if (Array.isArray(attrs) && attrs.length > 0) {
            attrs.forEach((a: DopAttributes) => {
                switch (a.name) {
                    case ATTR_NAME: {
                        bucket.name = a.value || '';
                        break;
                    }
                    case ATTR_COLOR: {
                        bucket.color = a.value || '';
                        break;
                    }
                }
            });
        } else {
            bucket.name = '';
            bucket.color = '';
        }
        // bucket.fullName = v.name;
        bucket.code = v.code || '';
        bucket.pathName = v.pathName;
        bucket.article = v.article || '';
        bucket.idHref = v.meta.href || '';
        
        result.push(bucket);  
    } 
    return result;
}