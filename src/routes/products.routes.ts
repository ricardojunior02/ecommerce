import { Router } from 'express';
import multer from 'multer';
import AdminMiddleware from '../middlewares/adminMiddleware';
import ProdutsController from '../controllers/ProdutsController';
// import AddProductImageController from '../controllers/AddImageProductController';
import uploadConfig from '../config/multer';

const upload = multer(uploadConfig.multer);

const product = Router();
// PRODUCTS CRUD
product.post('/products', AdminMiddleware, upload.array('image', 4), ProdutsController.store);
product.delete('/products/:id', AdminMiddleware, ProdutsController.delete);
// product.patch(
//   '/products/:id',
//   upload.array('images', 4),
//   AdminMiddleware,
//   AddProductImageController.store,
// );
product.get('/products', ProdutsController.show);

export default product;
