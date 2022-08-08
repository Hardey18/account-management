import express from 'express';
import controller from '../controllers/accounts';

const router = express.Router();

router.get('/accounts', controller.getAccount);

router.post('/accounts', controller.createAccount)

router.put('/accounts', controller.deposit)

export = router;
