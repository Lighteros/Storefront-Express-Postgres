"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../../models/User");
const server_1 = __importDefault(require("../../server"));
const userModel = new User_1.User();
const request = (0, supertest_1.default)(server_1.default);
const SECRET = process.env.JWT_SECRET;
describe('Users endpoints', () => {
    const user = {
        username: 'jiderrrr',
        firstname: 'Tolulope',
        lastname: 'kola',
        password: 'test',
    };
    let token;
    let userId;
    it('should create a user and return 201', async () => {
        const res = await request.post('/api/auth/register').send(user);
        const { status, body } = res;
        expect(status).toEqual(201);
        await userModel.deleteUser(body.id);
    });
    it('should login a user', async () => {
        const res = await request.post('/api/auth/login').send({ username: user.username, password: user.password });
        const { status, body } = res;
        token = body.token;
        userId = body.user.id;
        const decoded = jsonwebtoken_1.default.verify(token, SECRET);
        expect(status).toEqual(200);
        expect(decoded.id).toBe(userId);
        // await userModel.deleteUser(userId);
    });
    it('should get all users', async () => {
        const res = await request.get('/api/users').set('Authorization', `Bearer ${token}`);
        const { body } = res;
        expect(body.status).toBeTrue();
    });
    it('should get one user', async () => {
        const res = await request.get(`/api/users/${userId}`).set('Authorization', `Bearer ${token}`);
        const { body } = res;
        expect(body.status).toBeTrue();
    });
    it('should update user', async () => {
        const res = await request
            .patch(`/api/users/${userId}`)
            .send({ firstname: 'kolawole', lastname: 'folorunso' })
            .set('Authorization', `Bearer ${token}`);
        const { body } = res;
        expect(body.status).toBeTrue();
    });
    it('should delete one user', async () => {
        const res = await request.delete(`/api/users/${userId}`).set('Authorization', `Bearer ${token}`);
        const { body } = res;
        expect(body.status).toBeTrue();
        await userModel.deleteUser(userId);
    });
});
