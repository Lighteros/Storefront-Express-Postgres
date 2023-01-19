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
exports.User = void 0;
/* eslint-disable no-useless-catch */
var database_1 = __importDefault(require("../database"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var globalErrorHandler_1 = require("../middleware/globalErrorHandler");
var User = /** @class */ (function () {
    function User() {
    }
    User.prototype.register = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var username, firstname, lastname, password, userExistsSql, sql, connection, data, salt, hashedPassword, rows, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        username = user.username, firstname = user.firstname, lastname = user.lastname, password = user.password;
                        userExistsSql = "SELECT username FROM users WHERE username = $1";
                        sql = 'INSERT INTO users (username,firstname,lastname,password) VALUES($1, $2, $3, $4) RETURNING *';
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, connection.query(userExistsSql, [username])];
                    case 2:
                        data = _a.sent();
                        if (data.rows.length >= 1) {
                            throw new globalErrorHandler_1.BadRequest("Username is in use");
                        }
                        return [4 /*yield*/, bcryptjs_1["default"].genSalt(10)];
                    case 3:
                        salt = _a.sent();
                        return [4 /*yield*/, bcryptjs_1["default"].hash(password, salt)];
                    case 4:
                        hashedPassword = _a.sent();
                        return [4 /*yield*/, connection.query(sql, [username, firstname, lastname, hashedPassword])];
                    case 5:
                        rows = (_a.sent()).rows;
                        connection.release();
                        return [2 /*return*/, rows[0]];
                    case 6:
                        error_1 = _a.sent();
                        if (error_1 instanceof Error) {
                            throw new globalErrorHandler_1.BadRequest(error_1.message);
                        }
                        throw new globalErrorHandler_1.CustomError('something went wrong', 500);
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    User.prototype.login = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, connection, rows, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = 'SELECT * FROM users WHERE username=($1)';
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, connection.query(sql, [username])];
                    case 2:
                        rows = (_a.sent()).rows;
                        connection.release();
                        return [2 /*return*/, rows[0]];
                    case 3:
                        error_2 = _a.sent();
                        if (error_2 instanceof Error) {
                            throw new globalErrorHandler_1.CustomError(error_2.message);
                        }
                        else {
                            throw new globalErrorHandler_1.CustomError('Something went wrong');
                        }
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    User.prototype.getUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sql, connection, rows, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = 'SELECT * FROM users';
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, connection.query(sql)];
                    case 2:
                        rows = (_a.sent()).rows;
                        connection.release();
                        return [2 /*return*/, rows];
                    case 3:
                        error_3 = _a.sent();
                        throw error_3;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    User.prototype.getUser = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, connection, rows, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = 'SELECT * FROM users WHERE id = ($1)';
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, connection.query(sql, [id])];
                    case 2:
                        rows = (_a.sent()).rows;
                        connection.release();
                        return [2 /*return*/, rows[0]];
                    case 3:
                        error_4 = _a.sent();
                        throw error_4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    User.prototype.deleteUser = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, connection, rows, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = 'DELETE FROM users WHERE id = $1';
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, connection.query(sql, [id])];
                    case 2:
                        rows = (_a.sent()).rows;
                        connection.release();
                        return [2 /*return*/, rows[0]];
                    case 3:
                        error_5 = _a.sent();
                        throw error_5;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    User.prototype.updateUser = function (firstname, lastname, id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, connection, rows, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = 'UPDATE users SET firstname = $1, lastname = $2 WHERE id = $3 RETURNING  *';
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, connection.query(sql, [firstname, lastname, id])];
                    case 2:
                        rows = (_a.sent()).rows;
                        connection.release();
                        return [2 /*return*/, rows[0]];
                    case 3:
                        error_6 = _a.sent();
                        throw error_6;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return User;
}());
exports.User = User;
