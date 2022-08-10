import fs from 'fs';

export const uniqueAccountNumber: string = (Math.floor(Math.random() * 10000000000) + 10000000000).toString().substring(1);

export const saveAccountData = (data: any) => {
    const stringifyData = JSON.stringify(data, null, 2)
    fs.writeFileSync('account.json', stringifyData);
}

export const saveTransactionData = (data: any) => {
    const stringifyData = JSON.stringify(data, null, 2)
    fs.writeFileSync('transaction.json', stringifyData);
}

export const getAccountData = () => {
    const jsonData: any = fs.readFileSync('account.json')
    return JSON.parse(jsonData);
}

export const getTransactionData = () => {
    const jsonData: any = fs.readFileSync('transaction.json')
    return JSON.parse(jsonData);
}
