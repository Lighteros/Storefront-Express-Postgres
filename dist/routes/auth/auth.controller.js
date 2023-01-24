"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.registerUser = void 0;
const User_1 = require("../../models/User");
const globalErrorHandler_1 = require("../../middleware/globalErrorHandler");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// import { createJWT } from '../../utils/jwt';
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../../utils/env");
const userDB = new User_1.User();
const registerUser = async (req, res) => {
    const username = req.body.username;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const password = req.body.password;
    if (!username || !firstname || !lastname || !password) {
        throw new globalErrorHandler_1.BadRequest(`All fields required`);
    }
    try {
        const user = await userDB.register({ username, firstname, lastname, password });
        res.status(201).json({
            status: true,
            message: 'Registered successfully',
            user,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                status: true,
                message: `${error.message}`,
            });
        }
        else {
            res.status(500).json({
                status: true,
                message: 'Something went wrong',
            });
        }
    }
};
exports.registerUser = registerUser;
const login = async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password) {
        return next(new globalErrorHandler_1.BadRequest('All fields required'));
    }
    try {
        const user = await userDB.login(username);
        if (!user) {
            return next(new globalErrorHandler_1.UnauthenticatedError('Invalid credential'));
        }
        const isPasswordCorrect = await bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordCorrect) {
            return next(new globalErrorHandler_1.UnauthenticatedError('Invalid credential'));
        }
        const usernameJwt = user.username;
        const idJwt = user.id;
        const JWT_SECRET = env_1.jwtSecret;
        const JWT_EXPIRES_IN = env_1.jwtExpiresIn;
        const token = jsonwebtoken_1.default.sign({ username: usernameJwt, id: idJwt }, JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN,
        });
        res.status(200).json({
            status: true,
            message: 'Registered successfully',
            user,
            token,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            next(new Error(error.message));
        }
    }
};
exports.login = login;
