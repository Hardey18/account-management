import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

interface Account {
    id: String;
    accountNumber: String;
    accountName: String;
    phone: String;
    balance: Number;
    createdAt: String;
    updatedAt: String;
}

const uniqueAccountNumber: string = (Math.floor(Math.random() * 10000000000) + 10000000000).toString().substring(1);

let date = new Date();

const getAccount = (req: Request, res: Response, next: NextFunction) => {
    const accounts = getAccountData()
    return res.status(200).json({
        message: accounts
    });
}

const createAccount = (req: Request, res: Response, next: NextFunction) => {
    const existAccount = getAccountData();

    const accountData: Account = {
        id: uuidv4(),
        accountNumber: uniqueAccountNumber,
        accountName: req.body.accountName,
        phone: req.body.phone,
        balance: 0,
        createdAt: date.toString(),
        updatedAt: date.toString()
    }

    // Append the Account
    existAccount.push(accountData);

    // Save the new account
    saveUserData(existAccount);
    res.send({
        success: true,
        message: 'Account created successfully',
        accountNumber: accountData.accountNumber
    })
}

const deposit = (req: Request, res: Response, next: NextFunction) => {
    const existAccount = getAccountData();

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
        updatedAt: date.toString(),
    }
    
    const updatedAccount = existAccount.filter((account: { accountNumber: string }) => account.accountNumber !== accountNumber)

    updatedAccount.push(accountData)

    saveUserData(updatedAccount)

    res.send({
        success: true,
        message: 'The deposit to your account was successfully',
        totalBalance: totalBalance,
        amountDeposited: amount
    })
}

const withdrawal = (req: Request, res: Response, next: NextFunction) => {
    const existAccount = getAccountData();

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
        updatedAt: date.toString(),
    }

    const updatedAccount = existAccount.filter((account: { accountNumber: string }) => account.accountNumber !== accountNumber)

    updatedAccount.push(accountData)

    saveUserData(updatedAccount)

    res.send({
        success: true,
        message: 'Your withdrawal from your account was successful',
        totalBalance: totalBalance,
        amountWihdrawn: amount,
        accountNumber: findAccount.accountNumber
    })
}

//read the user data from json file
const saveUserData = (data: any) => {
    const stringifyData = JSON.stringify(data, null, 2)
    fs.writeFileSync('db.json', stringifyData);
}

const getAccountData = () => {
    const jsonData: any = fs.readFileSync('db.json')
    return JSON.parse(jsonData);
}

export default { getAccount, createAccount, deposit, withdrawal };
