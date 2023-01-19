"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var order_controller_1 = require("./order.controller");
var auth_1 = __importDefault(require("../../middleware/auth"));
var orderRoute = express_1["default"].Router();
orderRoute.post('/', auth_1["default"], order_controller_1.createOrder);
orderRoute.get('/', order_controller_1.getAllOrders);
// orderRoute.get('/:orderId', getOneOrder);
orderRoute["delete"]('/:orderId', auth_1["default"], order_controller_1.deleteOrder);
exports["default"] = orderRoute;
