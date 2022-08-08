import express from 'express';
import controller from '../controllers/accounts';

const router = express.Router();

router.get('/accounts/getAll', controller.getAccount);

router.post('/accounts/create', controller.createAccount)

router.put('/accounts/deposit', controller.deposit)

router.put('/accounts/withdraw', controller.withdrawal)

export = router;
