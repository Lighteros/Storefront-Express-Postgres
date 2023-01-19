import supertest from 'supertest';
import { PRODUCT } from '../../models/Products';

import { AUTH } from '../../models/User';
import app from '../../server';

const request = supertest(app);

let userToken: string;
let userId: number;
let productID: number;
let orderID: number;

const user: AUTH = {
  username: 'jiderrrr',
  firstname: 'Tolulope',
  lastname: 'kola',
  password: 'test',
};
const product: PRODUCT = {
  name: 'sjd',
  price: '100',
  category: 'Test Product Description',
};

describe('Order Request', () => {
  beforeAll(async () => {
    await request.post('/api/auth/register').send(user);
    const {
      body: { user: u, token },
    } = await request.post('/api/auth/login').send({ username: user.username, password: user.password });

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
