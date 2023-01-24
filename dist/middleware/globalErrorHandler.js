"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequest = exports.UnauthenticatedError = exports.CustomError = exports.NotFound = void 0;
const http_status_codes_1 = require("http-status-codes");
class CustomError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
        this.message = message;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.CustomError = CustomError;
class UnauthenticatedError extends CustomError {
    constructor(message) {
        super(message);
        this.status = http_status_codes_1.StatusCodes.UNAUTHORIZED;
    }
}
exports.UnauthenticatedError = UnauthenticatedError;
class BadRequest extends CustomError {
    constructor(message) {
        super(message);
        this.status = http_status_codes_1.StatusCodes.BAD_REQUEST;
    }
}
exports.BadRequest = BadRequest;
class NotFound extends CustomError {
    constructor(message) {
        super(message);
        this.status = http_status_codes_1.StatusCodes.NOT_FOUND;
    }
}
exports.NotFound = NotFound;
