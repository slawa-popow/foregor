import { Router } from "express";
import { mainController } from "./MainController";
import { uriSkladValid } from "../middlewares/validator";


const mainRouter = Router(); 

mainRouter.get('/',  mainController.getIndexPage);
mainRouter.post('/allProdFolder', mainController.getAllProdFolder);
mainRouter.post('/getProductByCats', uriSkladValid(), mainController.getProductByCats);
 

export { mainRouter }