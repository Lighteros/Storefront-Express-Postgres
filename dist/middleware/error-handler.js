"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
const errorHandlerMiddleware = (error, req, res, _next) => {
    // console.log(6, error.code);
    const customError = {
        status: error.status || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
        message: error.message || 'Something went wrong, try again later',
    };
    if (error.code === '22P02') {
        customError.message = `Wrong Data type: ${error.message}`;
        customError.status = http_status_codes_1.StatusCodes.BAD_REQUEST;
    }
    if (error.code === '23502') {
        customError.message = `Database: ${error.message}`;
        customError.status = http_status_codes_1.StatusCodes.BAD_REQUEST;
    }
    // if (error.name === 'ValidationError') {
    //   customError.message = Object.values(error.errors)
    //     .map(item => {
    //       return item.message;
    //     })
    //     .join(',');
    //   customError.statusCode = StatusCodes.BAD_REQUEST;
    // }
    // if (error.name === 'CastError') {
    //   customError.message = `No item found with id: ${error.value}`;
    //   customError.statusCode = StatusCodes.NOT_FOUND;
    // }
    return res.status(customError.status).json({
        status: false,
        message: customError.message,
        // error,
    });
    // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    //   status: false,
    //   message: 'Something went wrong',
    //   error,
    // });
};
exports.default = errorHandlerMiddleware;
