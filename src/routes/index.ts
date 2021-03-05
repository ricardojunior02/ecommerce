import { Router } from 'express';
import userRoutes from './users.routes';
import adminRoutes from './admin.routes';
import produtsRoutes from './products.routes';
import transactionRoutes from './transactions.routes';

const routes = Router();

routes.use(userRoutes);
routes.use(adminRoutes);
routes.use(produtsRoutes);
routes.use(transactionRoutes)


export default routes;
