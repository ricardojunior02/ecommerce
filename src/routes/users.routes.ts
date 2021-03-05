import { Router } from 'express';
import UserController from '../controllers/UserController';
import SessionController from '../controllers/SessionController';
import AuthMiddleware from '../middlewares/autehticateMiddleware';
import AvatarUserController from '../controllers/AvatarUserController';
import uploadConfig from '../config/multer';
import multer from 'multer';

const upload = multer(uploadConfig.multer);

const user = Router();
// Session
user.post('/session', SessionController.store);

// Create, Update, Delete
user.post('/user', UserController.store);
user.put('/user', AuthMiddleware, UserController.update);
user.patch('/user/:id', upload.single('avatar'), AuthMiddleware, AvatarUserController.store)
user.delete('/user/:id', AuthMiddleware, UserController.delete)


export default user;
