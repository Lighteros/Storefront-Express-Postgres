"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = __importDefault(require("./routes"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import asyncErrors from 'express-async-errors';
// require('express-async-errors');
// import { globalErrorHandler } from './middleware/globalErrorHandler';
const error_handler_1 = __importDefault(require("./middleware/error-handler"));
// import notFoundHandler from './middleware/notFound';
// import { NotFound } from './middleware/globalErrorHandler';
dotenv_1.default.config();
const app = (0, express_1.default)();
if (process.env.NODE_ENV === 'development') {
    app.use((0, morgan_1.default)('dev'));
}
// eslint-disable-next-line @typescript-eslint/no-inferrable-types
app.use(body_parser_1.default.json());
app.use('/api', routes_1.default);
// app.use(notFoundHandler);
app.use(error_handler_1.default);
const PORT = process.env.PORT || 3000;
const address = `0.0.0.0:${PORT}`;
app.listen(PORT, function () {
    console.log(`starting app on: ${address}`);
});
exports.default = app;
