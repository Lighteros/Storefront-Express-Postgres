import { NextFunction, Request, Response } from 'express';
import { BadRequest, NotFound } from '../../middleware/globalErrorHandler';
import { StatusCodes } from 'http-status-codes';
import Order, { OrderProduct } from '../../models/Order';

const orderModel = new Order();

const createOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const userId = req.body.userId as unknown as number;
  let status = req.body.status as unknown as boolean;
  const products = req.body.products as unknown as OrderProduct[];

  status = false;

  const canSave: boolean = [userId, products].every(Boolean);

  console.log(userId, products);

  if (!canSave) {
    return next(new BadRequest('All fields are required'));
  }

  if (!products.length) {
    return next(new BadRequest('No products added'));
  }

  try {
    const order = await orderModel.create({ products, userId, status });
    res.status(StatusCodes.CREATED).json({
      status: true,
      message: 'Order created successfully',
      order,
    });
  } catch (error) {
    next(error);
  }
};

const getAllOrders = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const orders = await orderModel.index();

    res.status(StatusCodes.OK).json({
      status: true,
      message: 'Order fetched successfully',
      result: orders.length,
      orders,
    });
  } catch (error) {
    next(error);
  }
};

const deleteOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const orderId = req.params.orderId as unknown as number;

  if (!orderId) {
    throw new BadRequest('orderId is required');
  }
  try {
    const order = await orderModel.delete(orderId);

    res.status(StatusCodes.NO_CONTENT).json({
      status: true,
      message: 'Order delete successfully',
      order,
    });
  } catch (error) {
    next(error);
  }
};

const getCurrentOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const orderId = req.params.orderId as unknown as number;

  if (!orderId) {
    throw new BadRequest('orderId is required');
  }
  try {
    const order = await orderModel.show(orderId);
    if (!order) {
      throw new NotFound('Order not found');
    }
    res.status(StatusCodes.OK).json({
      status: true,
      message: 'Order fetched successfully',
      order,
    });
  } catch (error) {
    next(error);
  }
};

export { createOrder, getAllOrders, deleteOrder, getCurrentOrder };
