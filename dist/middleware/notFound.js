"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const notFoundHandler = (req, res) => {
    res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
        status: false,
        message: `Route not found: The url is ${req.url}`,
    });
};
exports.default = notFoundHandler;
