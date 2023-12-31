import multer, { FileFilterCallback } from "multer";
import fs from 'fs';
import { Request} from 'express';
import dotenv from 'dotenv';
import { MRequest } from "../types/TypesApp";

dotenv.config();

const MAX_SIZE_IMG = 3200;   // 3200
const MAX_SIZE_VID = 42000;  // 42000

/**
 * Существует ли директория по пути path?
 * (multer не создает если не существует) 
 * @param path путь к папке (директории)
 * @returns { boolean }
 */
function isDir(path: string): boolean { 
    try {
        const stat = fs.lstatSync(path);
        return stat.isDirectory();
    } catch (e) {
        return false;
    }
}

// let pathUpload = process.env.DEV_PATH_UPLOAD_FILE;
let pathUpload = process.env.PROD_PATH_UPLOAD_FILE || "/home/p/pavel7rk/pavel7rk.beget.tech/public_html/";

if (process.platform === 'win32') {
    pathUpload = pathUpload?.replace(/[/]/g, '\\');
}

const mainHost = pathUpload;
const publicHost = 'photos/';
let dirpath = ''
let pthname = '';

const storage = multer.diskStorage({
    destination: (req: MRequest, _file, cb) => {
        dirpath = mainHost + publicHost;
        const indata = req.body;
        const pathName = indata.pathName + '/' + indata.color + '/'; 
        dirpath += pathName;
        pthname = pathName;
        req.photoPath = '';
        // если папки для сохранения файла не существует, 
        // to она будет создана по пути dirpath
        if (isDir(dirpath)) {
            req.photoPath = dirpath;
            cb(null, dirpath);
        } else {
            fs.mkdir(dirpath, { recursive: true }, function(err) {
                if (err) {
                  console.log(err)
                } else {
                  console.log("multer --> New directory successfully created.");
                req.photoPath = dirpath;
                  cb(null, dirpath);
                }
              })
        }
        
    },
    filename: (req: MRequest, file, cb) => {
        const indata = req.body;
        const fname = indata.name + '_' + file.originalname;
        req.photoPath = 'https://kitopt24.site/' + publicHost + pthname + fname;
        cb(null, fname);
    },
  });

  // фильтр
  const fileFilterMiddleware = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    const strFileSize = req.headers["content-length"];
    let fileSize = 0;
    if (strFileSize) {
        fileSize = Math.round((+strFileSize) / 1000);
    }

    if ((file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/gif" ||
         file.mimetype === "image/jpeg" || file.mimetype === "application/octet-stream") 
         && (fileSize > 0 && fileSize <= MAX_SIZE_IMG) ) {

        cb(null, true);

    } else if (file.mimetype === "video/mp4" && (fileSize > 0 && fileSize <= MAX_SIZE_VID) ) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

  // file - name FormData input html формы
export const fileUploader = multer({ storage: storage, fileFilter: fileFilterMiddleware }).single('file'); 