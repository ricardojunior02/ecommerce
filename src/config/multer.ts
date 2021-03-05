import multer from 'multer';
import path from 'path';
import { uuid } from 'uuidv4';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  uploadsFolder: tmpFolder,
  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename: (req, file, callback) => {
        const fileHash = uuid();

        const fileName = `${fileHash}-${file.originalname}`;

        return callback(null, fileName);
      },
    }),
  },
};
