"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globalErrorHandler_1 = require("./globalErrorHandler");
// import { StatusCodes } from 'http-status-codes';
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticationMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        next(new globalErrorHandler_1.UnauthenticatedError('Invalid authorization'));
        return;
    }
    const token = authHeader.split(' ')[1];
    try {
        jsonwebtoken_1.default.verify(token, 'secret');
        // const { username, id } = decoded;
        // req.user = { username, id };
        next();
    }
    catch (error) {
        if (error instanceof Error) {
            next(new globalErrorHandler_1.UnauthenticatedError('Invalid user'));
        }
    }
};
exports.default = authenticationMiddleware;
