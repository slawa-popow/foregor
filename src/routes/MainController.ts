import { Request, Response } from 'express';
import { mySklad } from '../mysklad/MySklad';
import { PathNamePlitochka, ProductsByPathCats } from '../types/TypesMySklad';
import { createPathForGetProdList, getMinimizeListProds, getPatchesToProductList } from '../utils/funcs';
import { myValidationResult } from '../customErrors/customErrField';

class MainController {

    async getIndexPage(_request: Request, response: Response) {
        return response.status(200).render('index', {layout: 'main'}); 
    }
    
    async getAllProdFolder(_request: Request, response: Response) {
        const productFolders: PathNamePlitochka[] = await mySklad.getAllProductFolders();
        const arrPathName = await getPatchesToProductList(productFolders);
        const arrPathes = await createPathForGetProdList(arrPathName);
        
        return response.status(200).json(arrPathes);
    }

    async getProductByCats(request: Request, response: Response) {
        const errors = myValidationResult(request);
         
        if (!errors.isEmpty()) {
            return response.status(400).json( { errors: errors.array({onlyFirstError: true}) } );
        } 
        const uriData = request.body.URISklad;
        const resultSklad: ProductsByPathCats[] = await mySklad.getProductByCatsFromSklad<ProductsByPathCats>(uriData);
        
        const responseResult = await getMinimizeListProds(resultSklad);
        
        return response.status(200).json(responseResult);
    }

}


export const mainController = new MainController();