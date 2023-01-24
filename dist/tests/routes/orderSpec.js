"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const request = (0, supertest_1.default)(server_1.default);
let userToken;
let userId;
let productID;
let orderID;
const user = {
    username: 'jiderrrr',
    firstname: 'Tolulope',
    lastname: 'kola',
    password: 'test',
};
const product = {
    name: 'sjd',
    price: '100',
    category: 'Test Product Description',
};
describe('Order Request', () => {
    beforeAll(async () => {
        await request.post('/api/auth/register').send(user);
        const { body: { user: u, token }, } = await request.post('/api/auth/login').send({ username: user.username, password: user.password });
        userId = u.id;
        userToken = token;
        console.log(userId);
    });
    it('should create a new order', async () => {
        const { body: b } = await request.post('/api/products').send(product).set('Authorization', `Bearer ${userToken}`);
        productID = b.product.id;
        const { status, body } = await request
            .post('/api/orders')
            .send({
            userId: userId,
            status: false,
            products: [
                {
                    productId: productID,
                    quantity: 2,
                },
            ],
        })
            .set('Authorization', `Bearer ${userToken}`);
        orderID = body.order.id;
        expect(status).toEqual(201);
    });
    it('should get all orders', async () => {
        const { status, body } = await request.get('/api/orders').set('Authorization', `Bearer ${userToken}`);
        expect(status).toEqual(200);
        expect(body.orders.length).toBeGreaterThanOrEqual(1);
    });
    it('should delete order endpoint', async () => {
        const { status } = await request.delete('/api/orders/' + orderID).set('Authorization', `Bearer ${userToken}`);
        expect(status).toEqual(204);
    });
    afterAll(async () => {
        await request.delete(`/api/users/${userId}`).set('Authorization', `Bearer ${userToken}`);
        await request.delete('/api/products/' + productID);
    });
});
