"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentOrder = exports.deleteOrder = exports.getAllOrders = exports.createOrder = void 0;
const globalErrorHandler_1 = require("../../middleware/globalErrorHandler");
const http_status_codes_1 = require("http-status-codes");
const Order_1 = __importDefault(require("../../models/Order"));
const orderModel = new Order_1.default();
const createOrder = async (req, res, next) => {
    const userId = req.body.userId;
    let status = req.body.status;
    const products = req.body.products;
    status = false;
    const canSave = [userId, products].every(Boolean);
    console.log(userId, products);
    if (!canSave) {
        return next(new globalErrorHandler_1.BadRequest('All fields are required'));
    }
    if (!products.length) {
        return next(new globalErrorHandler_1.BadRequest('No products added'));
    }
    try {
        const order = await orderModel.create({ products, userId, status });
        res.status(http_status_codes_1.StatusCodes.CREATED).json({
            status: true,
            message: 'Order created successfully',
            order,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createOrder = createOrder;
const getAllOrders = async (req, res, next) => {
    try {
        const orders = await orderModel.index();
        res.status(http_status_codes_1.StatusCodes.OK).json({
            status: true,
            message: 'Order fetched successfully',
            result: orders.length,
            orders,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getAllOrders = getAllOrders;
const deleteOrder = async (req, res, next) => {
    const orderId = req.params.orderId;
    if (!orderId) {
        throw new globalErrorHandler_1.BadRequest('orderId is required');
    }
    try {
        const order = await orderModel.delete(orderId);
        res.status(http_status_codes_1.StatusCodes.NO_CONTENT).json({
            status: true,
            message: 'Order delete successfully',
            order,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteOrder = deleteOrder;
const getCurrentOrder = async (req, res, next) => {
    const orderId = req.params.orderId;
    if (!orderId) {
        throw new globalErrorHandler_1.BadRequest('orderId is required');
    }
    try {
        const order = await orderModel.show(orderId);
        if (!order) {
            throw new globalErrorHandler_1.NotFound('Order not found');
        }
        res.status(http_status_codes_1.StatusCodes.OK).json({
            status: true,
            message: 'Order fetched successfully',
            order,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getCurrentOrder = getCurrentOrder;
