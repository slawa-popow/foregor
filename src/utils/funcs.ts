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



function unpackAttributes(attrs: any[]): {name: string, color: string} {
    const ATTR_NAME = 'Название';
    const ATTR_COLOR = 'Цвет';
     
    const bucket = {name: '', color: ''};
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
    return bucket
}


export async function getMinimizeListProds(res: ProductsByPathCats[]): Promise<any[]> {
    
    const result: any[] = [];
    for (let v of res) {
        const bucket: any = {};
        const attrs = v.attributes;
        if (Array.isArray(attrs) && attrs.length > 0) {
            const unp = unpackAttributes(attrs);
            bucket.name = unp.name;
            bucket.color = unp.color;
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


export function preparedDataToWrite(objs: ProductsByPathCats[]): (string | number | boolean)[][] {
    const resArr = [];

    for (let val of objs) {
        const id = val.id;
        const fullName = val.name;
        let name = '';
        let color = '';
        if (val.attributes && Array.isArray(val.attributes) && val.attributes.length > 0) {
            const unp = unpackAttributes(val.attributes);
            name = unp.name;
            color = unp.color;
        }
        const accountId = val.accountId;
        const shared = val.shared;
        const updated = val.updated;
        const code = val.code || '';
        const externalCode = val.externalCode;
        const arhived = val.archived;
        const pathName = val.pathName;
        const effectiveVat = val.effectiveVat || 0;
        const effectiveVatEn = val.effectiveVatEnabled || '';
        const vat = val.vat || 0;
        const vatEnabled = val.vatEnabled || '';
        const useParentVat = val.useParentVat;
        const taxSys = val.taxSystem || '';
        const payItType = val.paymentItemType || '';
        const dicountProh = val.discountProhibited;
        const weighed = val.weighed || '';
        const weight = val.weight || 0;
        const volume = val.volume || 0;
        const varCount = val.variantsCount;
        const isSerTrack = val.isSerialTrackable || '';

        const bucketArr = [id, name, color, accountId, shared, updated, fullName, code, externalCode,
                           arhived, pathName, effectiveVat, effectiveVatEn, vat, vatEnabled, useParentVat,
                           taxSys, payItType, dicountProh, weighed, weight, volume, varCount, isSerTrack];
                        
        resArr.push(bucketArr);
    }
    return resArr;
}