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
exports.__esModule = true;
exports.deleteProduct = exports.getOneProduct = exports.getAllProducts = exports.createProduct = void 0;
var globalErrorHandler_1 = require("../../middleware/globalErrorHandler");
var Products_1 = require("../../models/Products");
var http_status_codes_1 = require("http-status-codes");
var productModel = new Products_1.Product();
var createProduct = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var name, price, category, isAllFieldsAvaliable, product, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                name = req.body.name;
                price = req.body.price;
                category = req.body.category;
                isAllFieldsAvaliable = [name, price].every(Boolean);
                if (!isAllFieldsAvaliable) {
                    return [2 /*return*/, next(new globalErrorHandler_1.BadRequest("All fields required"))];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, productModel.create({ name: name, price: price, category: category })];
            case 2:
                product = _a.sent();
                res.status(http_status_codes_1.StatusCodes.CREATED).json({
                    status: true,
                    message: 'Product created successfully',
                    product: product
                });
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                if (error_1 instanceof Error) {
                    next(new Error('Something went wrong'));
                }
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createProduct = createProduct;
var getAllProducts = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var category, products, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                category = req.query.category;
                products = void 0;
                if (!category) return [3 /*break*/, 2];
                return [4 /*yield*/, productModel.showCategory(category)];
            case 1:
                products = _a.sent();
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, productModel.index()];
            case 3:
                products = _a.sent();
                _a.label = 4;
            case 4:
                res.status(http_status_codes_1.StatusCodes.OK).json({
                    status: true,
                    message: 'Products fetched successfully',
                    result: products.length,
                    products: products
                });
                return [3 /*break*/, 6];
            case 5:
                error_2 = _a.sent();
                if (error_2 instanceof Error) {
                    next(new Error('Something went wrong'));
                }
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.getAllProducts = getAllProducts;
var getOneProduct = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var productId, product, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                productId = req.params.productId;
                if (!productId) {
                    return [2 /*return*/, next(new globalErrorHandler_1.BadRequest("Product ".concat(productId, " required.")))];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, productModel.show(productId)];
            case 2:
                product = _a.sent();
                if (!product) {
                    return [2 /*return*/, next(new globalErrorHandler_1.NotFound("Product not found. ".concat(productId)))];
                }
                res.status(http_status_codes_1.StatusCodes.OK).json({
                    status: true,
                    message: 'Product fetched successfully',
                    product: product
                });
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                if (error_3 instanceof Error) {
                    next(new Error('Something went wrong'));
                }
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getOneProduct = getOneProduct;
var deleteProduct = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var productId, isProductExist, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                productId = req.params.productId;
                return [4 /*yield*/, productModel.show(productId)];
            case 1:
                isProductExist = _a.sent();
                if (!isProductExist) {
                    return [2 /*return*/, next(new globalErrorHandler_1.NotFound("Product not found. ".concat(productId)))];
                }
                return [4 /*yield*/, productModel["delete"](productId)];
            case 2:
                _a.sent();
                res.status(http_status_codes_1.StatusCodes.NO_CONTENT).json({
                    status: true,
                    message: 'No content'
                });
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                next(error_4);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteProduct = deleteProduct;
