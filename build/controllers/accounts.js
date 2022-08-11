"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const utils_1 = require("../utils");
let date = new Date();
const createAccount = (req, res, next) => {
    const existAccount = (0, utils_1.getAccountData)();
    const accountData = {
        id: (0, uuid_1.v4)(),
        accountNumber: utils_1.uniqueAccountNumber,
        accountName: req.body.accountName,
        phone: req.body.phone,
        balance: 0,
        createdAt: Math.floor(date.getTime() / 1000).toFixed(0),
        updatedAt: Math.floor(date.getTime() / 1000).toFixed(0)
    };
    existAccount.push(accountData);
    (0, utils_1.saveAccountData)(existAccount);
    res.send({
        success: true,
        message: 'Account created successfully',
        accountNumber: accountData.accountNumber
    });
};
const deposit = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const existAccount = (0, utils_1.getAccountData)();
    const existTransaction = (0, utils_1.getTransactionData)();
    let amount = req.body.amount;
    let accountNumber = req.body.accountNumber;
    const findAccount = existAccount.find((account) => account.accountNumber === accountNumber);
    if (!findAccount) {
        return res.status(409).send({ error: true, message: 'The Account Number does not exist' });
    }
    let totalBalance = findAccount.balance + amount;
    const accountData = {
        id: findAccount.id,
        accountNumber: findAccount.accountNumber,
        accountName: findAccount.accountName,
        phone: findAccount.phone,
        balance: totalBalance,
        createdAt: findAccount.createdAt,
        updatedAt: Math.floor(date.getTime() / 1000).toFixed(0)
    };
    const transactionData = {
        id: (0, uuid_1.v4)(),
        transactionType: "Credit",
        accountName: findAccount.accountName,
        accountNumber: findAccount.accountNumber,
        amountDeposited: amount,
        createdAt: Math.floor(date.getTime() / 1000).toFixed(0),
        updatedAt: Math.floor(date.getTime() / 1000).toFixed(0)
    };
    const updatedAccount = existAccount.filter((account) => account.accountNumber !== accountNumber);
    updatedAccount.push(accountData);
    existTransaction.push(transactionData);
    (0, utils_1.saveAccountData)(updatedAccount);
    (0, utils_1.saveTransactionData)(existTransaction);
    res.send({
        success: true,
        message: 'The deposit to your account was successfull',
        totalBalance: totalBalance,
        amountDeposited: amount
    });
});
const withdrawal = (req, res, next) => {
    const existAccount = (0, utils_1.getAccountData)();
    const existTransaction = (0, utils_1.getTransactionData)();
    let amount = req.body.amount;
    let accountNumber = req.body.accountNumber;
    const findAccount = existAccount.find((account) => account.accountNumber === accountNumber);
    if (!findAccount) {
        return res.status(409).send({ error: true, message: 'The Account Number does not exist' });
    }
    if (findAccount.balance < amount) {
        return res.status(409).send({ error: true, message: 'The amount you are trying to withdraw exceeds your current balance' });
    }
    let totalBalance = findAccount.balance - amount;
    const accountData = {
        id: findAccount.id,
        accountNumber: findAccount.accountNumber,
        accountName: findAccount.accountName,
        phone: findAccount.phone,
        balance: totalBalance,
        createdAt: findAccount.createdAt,
        updatedAt: Math.floor(date.getTime() / 1000).toFixed(0)
    };
    const transactionData = {
        id: (0, uuid_1.v4)(),
        transactionType: "Debit",
        accountName: findAccount.accountName,
        accountNumber: findAccount.accountNumber,
        amountWithdrawn: amount,
        createdAt: Math.floor(date.getTime() / 1000).toFixed(0),
        updatedAt: Math.floor(date.getTime() / 1000).toFixed(0)
    };
    const updatedAccount = existAccount.filter((account) => account.accountNumber !== accountNumber);
    updatedAccount.push(accountData);
    existTransaction.push(transactionData);
    (0, utils_1.saveAccountData)(updatedAccount);
    (0, utils_1.saveTransactionData)(existTransaction);
    res.send({
        success: true,
        message: 'Your withdrawal from your account was successful',
        totalBalance: totalBalance,
        amountWihdrawn: amount,
        accountNumber: findAccount.accountNumber
    });
};
const getAllTransactions = (req, res, next) => {
    const transactions = (0, utils_1.getTransactionData)();
    const sortedTransaction = transactions.sort((objA, objB) => Number(objB.createdAt) - Number(objA.createdAt));
    return res.status(200).json({
        message: sortedTransaction
    });
};
const getTransactionsByAccountNumber = (req, res, next) => {
    const accountNumber = req.params.accountNumber;
    const transactions = (0, utils_1.getTransactionData)();
    const findAccount = transactions.filter((account) => account.accountNumber === accountNumber);
    if (!findAccount) {
        return res.status(409).send({ error: true, message: 'Transaction with the given Account Number does not exist' });
    }
    return res.status(200).json({
        message: findAccount
    });
};
exports.default = { createAccount, deposit, withdrawal, getAllTransactions, getTransactionsByAccountNumber };
