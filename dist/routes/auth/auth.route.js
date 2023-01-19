"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var auth_controller_1 = require("./auth.controller");
var authRoute = express_1["default"].Router();
authRoute.post('/register', auth_controller_1.registerUser);
authRoute.post('/login', auth_controller_1.login);
exports["default"] = authRoute;
