import { Router } from "express";
import { mainController } from "./MainController";
import { authValidate, colorNameFormOprihodValid, countFormOprihodValid, deleteRowValid, 
    isExistsNameColor, 
    uriSkladValid, validInputDataToGetAttributes } from "../middlewares/validator";
import { fileUploader } from "../middlewares/fileUploader";


const mainRouter = Router(); 

mainRouter.get('/',  mainController.getIndexPage);
mainRouter.get('/work', authValidate, mainController.getWorkPage);
mainRouter.post('/getTableOprihod', mainController.getTableOprihod);
mainRouter.post('/deleteRow', deleteRowValid(), mainController.deleteRow);
    // добавить потом фильтр авторизации
mainRouter.post('/doOprihod', mainController.doOprihod);
mainRouter.post('/fromTelegram', mainController.fromTelegram);
mainRouter.post('/allProdFolder', mainController.getAllProdFolder);
mainRouter.post('/getProductByCats', uriSkladValid(), mainController.getProductByCats);
mainRouter.post('/getUniqPathes', mainController.getUniqPathes);
mainRouter.post('/getAttrsByPath', validInputDataToGetAttributes(), mainController.getAttrsByPath);
mainRouter.post('/formOprihod', 
                 fileUploader,
                 isExistsNameColor,
                 validInputDataToGetAttributes(),
                 colorNameFormOprihodValid('name'),
                 colorNameFormOprihodValid('color'),
                 countFormOprihodValid(),
                 mainController.formDataOprihod);

mainRouter.post('/writeFromMyskladToDb', mainController.getAllProdFromMySkladAndWriteToDb);

mainRouter.post('/testdb', mainController.postTestDb);

 

export { mainRouter }