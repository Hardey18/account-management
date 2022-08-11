"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransactionData = exports.getAccountData = exports.saveTransactionData = exports.saveAccountData = exports.uniqueAccountNumber = void 0;
const fs_1 = __importDefault(require("fs"));
exports.uniqueAccountNumber = (Math.floor(Math.random() * 10000000000) + 10000000000).toString().substring(1);
const saveAccountData = (data) => {
    const stringifyData = JSON.stringify(data, null, 2);
    fs_1.default.writeFileSync('account.json', stringifyData);
};
exports.saveAccountData = saveAccountData;
const saveTransactionData = (data) => {
    const stringifyData = JSON.stringify(data, null, 2);
    fs_1.default.writeFileSync('transaction.json', stringifyData);
};
exports.saveTransactionData = saveTransactionData;
const getAccountData = () => {
    const jsonData = fs_1.default.readFileSync('account.json');
    return JSON.parse(jsonData);
};
exports.getAccountData = getAccountData;
const getTransactionData = () => {
    const jsonData = fs_1.default.readFileSync('transaction.json');
    return JSON.parse(jsonData);
};
exports.getTransactionData = getTransactionData;
