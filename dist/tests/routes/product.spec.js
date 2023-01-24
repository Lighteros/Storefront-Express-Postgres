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
describe('Product Model', () => {
    const product = {
        name: 'sjd',
        price: '100',
        category: 'Test Product Description',
    };
    const user = {
        username: 'jiderrrr',
        firstname: 'Tolulope',
        lastname: 'kola',
        password: 'test',
    };
    beforeAll(async () => {
        await request.post('/api/auth/register').send(user);
        const { body: { user: u, token }, } = await request.post('/api/auth/login').send({ username: user.username, password: user.password });
        userId = u.id;
        userToken = token;
    });
    it('should return 201 for new product', async () => {
        const { body } = await request.post('/api/products').send(product).set('Authorization', `Bearer ${userToken}`);
        productID = body.product.id;
        expect(body.status).toBeTrue();
    });
    it('should get all products', async () => {
        const { body } = await request.get('/api/products');
        expect(body.status).toBeTrue();
        expect(body.products.length).toBeGreaterThanOrEqual(1);
    });
    it('should get one product endpoint', async () => {
        const { body } = await request.get('/api/products/' + productID);
        expect(body.status).toBeTrue();
    });
    it('should returns 401: No Content', async () => {
        const { statusCode } = await request.delete('/api/products/' + productID);
        expect(statusCode).toBe(401);
        await request.delete(`/api/users/${userId}`).set('Authorization', `Bearer ${userToken}`);
    });
});
