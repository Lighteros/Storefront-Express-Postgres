"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.login = exports.registerUser = void 0;
var User_1 = require("../../models/User");
var globalErrorHandler_1 = require("../../middleware/globalErrorHandler");
var bcryptjs_1 = __importDefault(require("bcryptjs"));
// import { createJWT } from '../../utils/jwt';
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var env_1 = require("../../utils/env");
var userDB = new User_1.User();
var registerUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var username, firstname, lastname, password, user, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                username = req.body.username;
                firstname = req.body.firstname;
                lastname = req.body.lastname;
                password = req.body.password;
                if (!username || !firstname || !lastname || !password) {
                    throw new globalErrorHandler_1.BadRequest("All fields required");
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, userDB.register({ username: username, firstname: firstname, lastname: lastname, password: password })];
            case 2:
                user = _a.sent();
                res.status(201).json({
                    status: true,
                    message: 'Registered successfully',
                    user: user
                });
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                if (error_1 instanceof Error) {
                    res.status(500).json({
                        status: true,
                        message: "".concat(error_1.message)
                    });
                }
                else {
                    res.status(500).json({
                        status: true,
                        message: 'Something went wrong'
                    });
                }
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.registerUser = registerUser;
var login = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var username, password, user, isPasswordCorrect, usernameJwt, idJwt, JWT_SECRET, JWT_EXPIRES_IN, token, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                username = req.body.username;
                password = req.body.password;
                if (!username || !password) {
                    return [2 /*return*/, next(new globalErrorHandler_1.BadRequest('All fields required'))];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, userDB.login(username)];
            case 2:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, next(new globalErrorHandler_1.UnauthenticatedError('Invalid credential'))];
                }
                return [4 /*yield*/, bcryptjs_1["default"].compare(password, user.password)];
            case 3:
                isPasswordCorrect = _a.sent();
                if (!isPasswordCorrect) {
                    return [2 /*return*/, next(new globalErrorHandler_1.UnauthenticatedError('Invalid credential'))];
                }
                usernameJwt = user.username;
                idJwt = user.id;
                JWT_SECRET = env_1.jwtSecret;
                JWT_EXPIRES_IN = env_1.jwtExpiresIn;
                token = jsonwebtoken_1["default"].sign({ username: usernameJwt, id: idJwt }, JWT_SECRET, {
                    expiresIn: JWT_EXPIRES_IN
                });
                res.status(200).json({
                    status: true,
                    message: 'Registered successfully',
                    user: user,
                    token: token
                });
                return [3 /*break*/, 5];
            case 4:
                error_2 = _a.sent();
                if (error_2 instanceof Error) {
                    next(new Error(error_2.message));
                }
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.login = login;
