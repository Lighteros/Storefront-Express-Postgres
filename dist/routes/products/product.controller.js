"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.getOneProduct = exports.getAllProducts = exports.createProduct = void 0;
const globalErrorHandler_1 = require("../../middleware/globalErrorHandler");
const Products_1 = require("../../models/Products");
const http_status_codes_1 = require("http-status-codes");
const productModel = new Products_1.Product();
const createProduct = async (req, res, next) => {
    const name = req.body.name;
    const price = req.body.price;
    const category = req.body.category;
    const isAllFieldsAvaliable = [name, price].every(Boolean);
    if (!isAllFieldsAvaliable) {
        return next(new globalErrorHandler_1.BadRequest(`All fields required`));
    }
    try {
        const product = await productModel.create({ name, price, category });
        res.status(http_status_codes_1.StatusCodes.CREATED).json({
            status: true,
            message: 'Product created successfully',
            product,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            next(new Error('Something went wrong'));
        }
    }
};
exports.createProduct = createProduct;
const getAllProducts = async (req, res, next) => {
    try {
        const category = req.query.category;
        let products;
        if (category) {
            products = await productModel.showCategory(category);
        }
        else {
            products = await productModel.index();
        }
        res.status(http_status_codes_1.StatusCodes.OK).json({
            status: true,
            message: 'Products fetched successfully',
            result: products.length,
            products,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            next(new Error('Something went wrong'));
        }
    }
};
exports.getAllProducts = getAllProducts;
const getOneProduct = async (req, res, next) => {
    const productId = req.params.productId;
    if (!productId) {
        return next(new globalErrorHandler_1.BadRequest(`Product ${productId} required.`));
    }
    try {
        const product = await productModel.show(productId);
        if (!product) {
            return next(new globalErrorHandler_1.NotFound(`Product not found. ${productId}`));
        }
        res.status(http_status_codes_1.StatusCodes.OK).json({
            status: true,
            message: 'Product fetched successfully',
            product,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            next(new Error('Something went wrong'));
        }
    }
};
exports.getOneProduct = getOneProduct;
const deleteProduct = async (req, res, next) => {
    try {
        const productId = req.params.productId;
        const isProductExist = await productModel.show(productId);
        if (!isProductExist) {
            return next(new globalErrorHandler_1.NotFound(`Product not found. ${productId}`));
        }
        await productModel.delete(productId);
        res.status(http_status_codes_1.StatusCodes.NO_CONTENT).json({
            status: true,
            message: 'No content',
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteProduct = deleteProduct;
