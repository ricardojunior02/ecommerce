import { Router } from 'express';
// import multer from 'multer';
import AdminUserController from '../controllers/AdminUserController';
import AdminSession from '../controllers/SessionAdminController';
import adminMIddleware from '../middlewares/adminMiddleware';
// import uploadConfig from '../config/multer';

// const upload = Multer(uploadConfig.multer);

const admin = Router();
// Session
admin.post('/admin_session', AdminSession.store);

// Create, Update, Delete
admin.post('/admin', AdminUserController.store);
admin.put('/admin', adminMIddleware, AdminUserController.update);

export default admin;
