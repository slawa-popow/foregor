import { Router } from "express";
import { mainController } from "./MainController";
import { uriSkladValid } from "../middlewares/validator";


const mainRouter = Router(); 

mainRouter.get('/',  mainController.getIndexPage);
mainRouter.post('/allProdFolder', mainController.getAllProdFolder);
mainRouter.post('/getProductByCats', uriSkladValid(), mainController.getProductByCats);
// mainRouter.post('/writeFromMyskladToDb', mainController.getAllProdFromMySkladAndWriteToDb);

mainRouter.post('/testdb', mainController.postTestDb);

 

export { mainRouter }