"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const productRoute = express_1.default.Router();
productRoute.post('/', auth_1.default, product_controller_1.createProduct);
productRoute.get('/', product_controller_1.getAllProducts);
productRoute.get('/:productId', product_controller_1.getOneProduct);
productRoute.delete('/:productId', auth_1.default, product_controller_1.deleteProduct);
exports.default = productRoute;
