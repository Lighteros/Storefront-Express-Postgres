"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = __importDefault(require("./auth/auth.route"));
const product_route_1 = __importDefault(require("./products/product.route"));
const order_route_1 = __importDefault(require("./order/order.route"));
const user_route_1 = __importDefault(require("./users/user.route"));
const routes = express_1.default.Router();
routes.get('/', (req, res) => {
    res.send('ok');
});
routes.use('/auth', auth_route_1.default);
routes.use('/users', user_route_1.default);
routes.use('/products', product_route_1.default);
routes.use('/orders', order_route_1.default);
exports.default = routes;
