"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const userRoute = express_1.default.Router();
userRoute.get('/', auth_1.default, user_controller_1.getUsers);
userRoute.get('/:userID', auth_1.default, user_controller_1.getUser);
userRoute.delete('/:userID', auth_1.default, user_controller_1.deleteUser);
userRoute.patch('/:userID', auth_1.default, user_controller_1.updateUser);
exports.default = userRoute;
