import { Router } from 'express';
import Autenticate from '../middlewares/autehticateMiddleware';
import TransactionController from '../controllers/TransactionsController';
const transaction = Router();

transaction.post('/transactions', Autenticate, TransactionController.store);

export default transaction;
