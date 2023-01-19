"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.BadRequest = exports.UnauthenticatedError = exports.CustomError = exports.NotFound = void 0;
var http_status_codes_1 = require("http-status-codes");
var CustomError = /** @class */ (function (_super) {
    __extends(CustomError, _super);
    function CustomError(message, status) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, message) || this;
        _this.status = status;
        _this.message = message;
        Object.setPrototypeOf(_this, _newTarget.prototype);
        return _this;
    }
    return CustomError;
}(Error));
exports.CustomError = CustomError;
var UnauthenticatedError = /** @class */ (function (_super) {
    __extends(UnauthenticatedError, _super);
    function UnauthenticatedError(message) {
        var _this = _super.call(this, message) || this;
        _this.status = http_status_codes_1.StatusCodes.UNAUTHORIZED;
        return _this;
    }
    return UnauthenticatedError;
}(CustomError));
exports.UnauthenticatedError = UnauthenticatedError;
var BadRequest = /** @class */ (function (_super) {
    __extends(BadRequest, _super);
    function BadRequest(message) {
        var _this = _super.call(this, message) || this;
        _this.status = http_status_codes_1.StatusCodes.BAD_REQUEST;
        return _this;
    }
    return BadRequest;
}(CustomError));
exports.BadRequest = BadRequest;
var NotFound = /** @class */ (function (_super) {
    __extends(NotFound, _super);
    function NotFound(message) {
        var _this = _super.call(this, message) || this;
        _this.status = http_status_codes_1.StatusCodes.NOT_FOUND;
        return _this;
    }
    return NotFound;
}(CustomError));
exports.NotFound = NotFound;
