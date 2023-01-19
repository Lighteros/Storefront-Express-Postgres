"use strict";
exports.__esModule = true;
var http_status_codes_1 = require("http-status-codes");
var notFoundHandler = function (req, res) {
    res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
        status: false,
        message: "Route not found: The url is ".concat(req.url)
    });
};
exports["default"] = notFoundHandler;
