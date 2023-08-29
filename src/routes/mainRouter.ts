import { Router } from "express";
import { mainController } from "./MainController";
import { uriSkladValid, validInputDataToGetAttributes } from "../middlewares/validator";


const mainRouter = Router(); 

mainRouter.get('/',  mainController.getIndexPage);
mainRouter.post('/allProdFolder', mainController.getAllProdFolder);
mainRouter.post('/getProductByCats', uriSkladValid(), mainController.getProductByCats);
mainRouter.post('/getUniqPathes', mainController.getUniqPathes);
mainRouter.post('/getAttrsByPath', validInputDataToGetAttributes(), mainController.getAttrsByPath);

// mainRouter.post('/writeFromMyskladToDb', mainController.getAllProdFromMySkladAndWriteToDb);

mainRouter.post('/testdb', mainController.postTestDb);

 

export { mainRouter }