"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var dotenv_1 = __importDefault(require("dotenv"));
var pg_1 = require("pg");
dotenv_1["default"].config();
var _a = process.env, POSTGRES_HOST = _a.POSTGRES_HOST, POSTGRES_DB = _a.POSTGRES_DB, POSTGRES_USER = _a.POSTGRES_USER, POSTGRES_PASSWORD = _a.POSTGRES_PASSWORD, TEST_POSTGRES_DB = _a.TEST_POSTGRES_DB, NODE_ENV = _a.NODE_ENV;
var connect;
if (NODE_ENV === 'dev') {
    connect = {
        host: POSTGRES_HOST,
        database: POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD
    };
}
if ((NODE_ENV === null || NODE_ENV === void 0 ? void 0 : NODE_ENV.trim()) === 'test') {
    connect = {
        host: POSTGRES_HOST,
        database: TEST_POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD
    };
}
var client = new pg_1.Pool(connect);
exports["default"] = client;
