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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const accounts_1 = __importDefault(require("../../routes/accounts"));
const router1 = (0, express_1.default)();
const app = (0, express_1.default)();
app.use('/', accounts_1.default);
let httpServer;
const testAccount = {
    accountName: "Oyinkansola Alabi",
    phone: "+345634231231"
};
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    httpServer = http_1.default.createServer(router1);
    const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 6060;
    httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
}));
afterEach(() => {
    httpServer.close();
});
it('should be no users initially', () => __awaiter(void 0, void 0, void 0, function* () {
    // const response = await supertest(router).get('/transactions');
    yield (0, supertest_1.default)(app).get("/transactions").expect(200);
    // console.log(res.body);
    // expect(res.body).toEqual({})
    // expect(res.status).toBe(200)
}));
// it('should create an account', async () => {
//     const response = await supertest(router).post('/accounts/create').send(testAccount);
//     expect(response.status).toBe(200)
//     expect(response.body).toEqual([])
// });
