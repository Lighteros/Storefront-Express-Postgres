"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var routes_1 = __importDefault(require("./routes"));
var morgan_1 = __importDefault(require("morgan"));
var dotenv_1 = __importDefault(require("dotenv"));
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import asyncErrors from 'express-async-errors';
require('express-async-errors');
// import { globalErrorHandler } from './middleware/globalErrorHandler';
var error_handler_1 = __importDefault(require("./middleware/error-handler"));
var notFound_1 = __importDefault(require("./middleware/notFound"));
// import { NotFound } from './middleware/globalErrorHandler';
dotenv_1["default"].config();
var app = (0, express_1["default"])();
if (process.env.NODE_ENV === 'development') {
    app.use((0, morgan_1["default"])('dev'));
}
// eslint-disable-next-line @typescript-eslint/no-inferrable-types
var address = '0.0.0.0:3000';
app.use(body_parser_1["default"].json());
app.use('/api', routes_1["default"]);
app.use(notFound_1["default"]);
app.use(error_handler_1["default"]);
app.listen(3000, function () {
    console.log("starting app on: ".concat(address));
});
exports["default"] = app;
