"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var auth_route_1 = __importDefault(require("./auth/auth.route"));
var product_route_1 = __importDefault(require("./products/product.route"));
var order_route_1 = __importDefault(require("./order/order.route"));
var user_route_1 = __importDefault(require("./users/user.route"));
var routes = express_1["default"].Router();
routes.get('/', function (req, res) {
    res.send('ok');
});
routes.use('/auth', auth_route_1["default"]);
routes.use('/users', user_route_1["default"]);
routes.use('/products', product_route_1["default"]);
routes.use('/orders', order_route_1["default"]);
exports["default"] = routes;
