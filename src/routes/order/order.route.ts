import express from 'express';
import { createOrder, deleteOrder, getAllOrders, getCurrentOrder } from './order.controller';
import authenticationMiddleware from '../../middleware/auth';

const orderRoute = express.Router();

orderRoute.post('/', authenticationMiddleware, createOrder);
orderRoute.get('/', getAllOrders);
orderRoute.get('/:orderId', getCurrentOrder);
orderRoute.delete('/:orderId', authenticationMiddleware, deleteOrder);

export default orderRoute;
