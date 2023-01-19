"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.jwtExpiresIn = exports.jwtSecret = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1["default"].config();
exports.jwtSecret = process.env.JWT_SECRET;
exports.jwtExpiresIn = process.env.JWT_EXPIRES_IN;
