import multer, { FileFilterCallback } from 'multer'
import { randomBytes } from 'crypto'
import { resolve } from 'path'

export let config: any = {};
config.db = {};
config.server = {};

config.db.user = "root";
config.db.host = "localhost";
config.db.database = "Notes";
config.db.password = "heja2121";
config.db.port = 3306;
config.server.port = 8000;

export const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './src/uploads/')
  },

  filename: function (req: any, file: any, cb: any) {
    cb(null, file.originalname)
  }

});

export const fileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype != "text/plain") {
    cb(null, true);

  }
  else {
    cb(new Error("Image uploaded is not of type jpg/jpeg or png"), false);
  }
}


export const upload: any = multer({ storage: storage, fileFilter: fileFilter, limits: { fieldSize: 10 * (1024 * 1024) } });
