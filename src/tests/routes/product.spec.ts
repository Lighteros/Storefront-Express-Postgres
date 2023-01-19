import supertest from 'supertest';
import { PRODUCT } from '../../models/Products';

import { AUTH } from '../../models/User';
import app from '../../server';

const request = supertest(app);

let userToken: string;
let userId: number;
let productID: number;

describe('Product Model', () => {
  const product: PRODUCT = {
    name: 'sjd',
    price: '100',
    category: 'Test Product Description',
  };

  const user: AUTH = {
    username: 'jiderrrr',
    firstname: 'Tolulope',
    lastname: 'kola',
    password: 'test',
  };

  beforeAll(async (): Promise<void> => {
    await request.post('/api/auth/register').send(user);
    const {
      body: { user: u, token },
    } = await request.post('/api/auth/login').send({ username: user.username, password: user.password });

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
