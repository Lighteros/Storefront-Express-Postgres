"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("./order.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const orderRoute = express_1.default.Router();
orderRoute.post('/', auth_1.default, order_controller_1.createOrder);
orderRoute.get('/', order_controller_1.getAllOrders);
orderRoute.get('/:orderId', order_controller_1.getCurrentOrder);
orderRoute.delete('/:orderId', auth_1.default, order_controller_1.deleteOrder);
exports.default = orderRoute;
