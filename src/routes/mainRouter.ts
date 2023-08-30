import { Router } from "express";
import { mainController } from "./MainController";
import { uriSkladValid, validInputDataToGetAttributes } from "../middlewares/validator";
import multer from "multer";

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, __dirname + "../../../uploads");
    },
    filename: (_req, file, cb) => {
        cb(null, file.originalname);
    },
  });
  
  export const mult = multer({ storage: storage });

const mainRouter = Router(); 

mainRouter.get('/',  mainController.getIndexPage);
mainRouter.post('/allProdFolder', mainController.getAllProdFolder);
mainRouter.post('/getProductByCats', uriSkladValid(), mainController.getProductByCats);
mainRouter.post('/getUniqPathes', mainController.getUniqPathes);
mainRouter.post('/getAttrsByPath', validInputDataToGetAttributes(), mainController.getAttrsByPath);
mainRouter.post('/formOprihod', mult.any(),  mainController.formDataOprihod);

// mainRouter.post('/writeFromMyskladToDb', mainController.getAllProdFromMySkladAndWriteToDb);

mainRouter.post('/testdb', mainController.postTestDb);

 

export { mainRouter }