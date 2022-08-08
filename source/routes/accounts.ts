import express from 'express';
import controller from '../controllers/accounts';

const router = express.Router();

router.post('/accounts/create', controller.createAccount)

router.put('/accounts/deposit', controller.deposit)

router.put('/accounts/withdraw', controller.withdrawal)

router.get('/transactions', controller.getAllTransactions)

router.get('/transactions/:accountNumber', controller.getTransactionsByAccountNumber)

export = router;
