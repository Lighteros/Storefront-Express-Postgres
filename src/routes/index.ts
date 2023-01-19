import express, { Request, Response } from 'express';
import authRoute from './auth/auth.route';
import productRoute from './products/product.route';
import orderRoute from './order/order.route';
import userRoute from './users/user.route';

const routes = express.Router();

routes.get('/', (req: Request, res: Response) => {
  res.send('ok');
});

routes.use('/auth', authRoute);
routes.use('/users', userRoute);
routes.use('/products', productRoute);
routes.use('/orders', orderRoute);

export default routes;
