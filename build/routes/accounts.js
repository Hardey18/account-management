"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const accounts_1 = __importDefault(require("../controllers/accounts"));
const router = express_1.default.Router();
router.post('/accounts/create', accounts_1.default.createAccount);
router.put('/accounts/deposit', accounts_1.default.deposit);
router.put('/accounts/withdraw', accounts_1.default.withdrawal);
router.get('/transactions', accounts_1.default.getAllTransactions);
router.get('/transactions/:accountNumber', accounts_1.default.getTransactionsByAccountNumber);
module.exports = router;
