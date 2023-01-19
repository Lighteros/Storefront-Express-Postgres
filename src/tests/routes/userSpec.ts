import supertest from 'supertest';
import jwt, { Secret } from 'jsonwebtoken';

import { AUTH, User } from '../../models/User';
import app from '../../server';

const userModel = new User();
const request = supertest(app);
const SECRET = process.env.JWT_SECRET as Secret;

interface TokenInterface {
  username: string;
  id: number;
}

describe('Users endpoints', () => {
  const user: AUTH = {
    username: 'jiderrrr',
    firstname: 'Tolulope',
    lastname: 'kola',
    password: 'test',
  };

  let token: string;
  let userId: number;

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
    const decoded = jwt.verify(token, SECRET) as TokenInterface;
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
