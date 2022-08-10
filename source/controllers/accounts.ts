import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Account } from '../interface';
import { getAccountData, getTransactionData, saveAccountData, saveTransactionData, uniqueAccountNumber } from '../utils';

let date = new Date();

const createAccount = (req: Request, res: Response, next: NextFunction) => {
    const existAccount = getAccountData();

    const accountData: Account = {
        id: uuidv4(),
        accountNumber: uniqueAccountNumber,
        accountName: req.body.accountName,
        phone: req.body.phone,
        balance: 0,
        createdAt: Math.floor(date.getTime() / 1000).toFixed(0),
        updatedAt: Math.floor(date.getTime() / 1000).toFixed(0)
    }

    existAccount.push(accountData);

    saveAccountData(existAccount);
    res.send({
        success: true,
        message: 'Account created successfully',
        accountNumber: accountData.accountNumber
    })
}

const deposit = async (req: Request, res: Response, next: NextFunction) => {
    const existAccount = getAccountData();
    const existTransaction = getTransactionData();

    let amount = req.body.amount;
    let accountNumber = req.body.accountNumber;
    
    const findAccount = existAccount.find((account: { accountNumber: string }) => account.accountNumber === accountNumber);

    if (!findAccount) {
        return res.status(409).send({error: true, message: 'The Account Number does not exist'})
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
    }

    const transactionData = {
        id: uuidv4(),
        transactionType: "Credit",
        accountName: findAccount.accountName,
        accountNumber: findAccount.accountNumber,
        amountDeposited: amount,
        createdAt: Math.floor(date.getTime() / 1000).toFixed(0),
        updatedAt: Math.floor(date.getTime() / 1000).toFixed(0)
    }
    
    const updatedAccount = existAccount.filter((account: { accountNumber: string }) => account.accountNumber !== accountNumber)

    updatedAccount.push(accountData)
    existTransaction.push(transactionData)

    saveAccountData(updatedAccount)
    saveTransactionData(existTransaction)

    res.send({
        success: true,
        message: 'The deposit to your account was successfull',
        totalBalance: totalBalance,
        amountDeposited: amount
    })
}

const withdrawal = (req: Request, res: Response, next: NextFunction) => {
    const existAccount = getAccountData();
    const existTransaction = getTransactionData();

    let amount = req.body.amount;
    let accountNumber = req.body.accountNumber;

    const findAccount = existAccount.find((account: { accountNumber: string }) => account.accountNumber === accountNumber);

    if (!findAccount) {
        return res.status(409).send({error: true, message: 'The Account Number does not exist'})
    }

    if (findAccount.balance < amount) {
        return res.status(409).send({error: true, message: 'The amount you are trying to withdraw exceeds your current balance'})
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
    }

    const transactionData = {
        id: uuidv4(),
        transactionType: "Debit",
        accountName: findAccount.accountName,
        accountNumber: findAccount.accountNumber,
        amountWithdrawn: amount,
        createdAt: Math.floor(date.getTime() / 1000).toFixed(0),
        updatedAt: Math.floor(date.getTime() / 1000).toFixed(0)
    }

    const updatedAccount = existAccount.filter((account: { accountNumber: string }) => account.accountNumber !== accountNumber)

    updatedAccount.push(accountData)
    existTransaction.push(transactionData)

    saveAccountData(updatedAccount)
    saveTransactionData(existTransaction)

    res.send({
        success: true,
        message: 'Your withdrawal from your account was successful',
        totalBalance: totalBalance,
        amountWihdrawn: amount,
        accountNumber: findAccount.accountNumber
    })
}

const getAllTransactions = (req: Request, res: Response, next: NextFunction) => {
    const transactions = getTransactionData();
    const sortedTransaction = transactions.sort((objA:any, objB:any) => Number(objB.createdAt) - Number(objA.createdAt));
    return res.status(200).json({
        message: sortedTransaction
    });
}

const getTransactionsByAccountNumber = (req: Request, res: Response, next: NextFunction) => {
    const accountNumber: string = req.params.accountNumber
    const transactions = getTransactionData()

    const findAccount = transactions.filter((account: { accountNumber: string }) => account.accountNumber === accountNumber);

    if (!findAccount) {
        return res.status(409).send({error: true, message: 'Transaction with the given Account Number does not exist'})
    }

    return res.status(200).json({
        message: findAccount
    });
}

export default { createAccount, deposit, withdrawal, getAllTransactions, getTransactionsByAccountNumber };
