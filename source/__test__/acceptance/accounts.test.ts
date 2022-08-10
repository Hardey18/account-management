import http, { Server } from 'http';
import request from 'supertest'
import express, { Express } from 'express';
import router from '../../routes/accounts';
const router1: Express = express();
const app = express();
app.use('/', router);

let httpServer: Server;

const testAccount = {
    accountName: "Oyinkansola Alabi",
    phone: "+345634231231"
}

beforeEach(async() => {
    httpServer = http.createServer(router1);
    const PORT: any = process.env.PORT ?? 6060;
    httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
})

afterEach(() => {
    httpServer.close();
})

it('should be no users initially', async () => {
    // const response = await supertest(router).get('/transactions');
    await request(app).get("/transactions").expect(200)
   
   
    // console.log(res.body);
    // expect(res.body).toEqual({})
    // expect(res.status).toBe(200)
});

// it('should create an account', async () => {
//     const response = await supertest(router).post('/accounts/create').send(testAccount);
//     expect(response.status).toBe(200)
//     expect(response.body).toEqual([])
// });