"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const database_1 = __importDefault(require("../database"));
const globalErrorHandler_1 = require("../middleware/globalErrorHandler");
class Product {
    async create(product) {
        try {
            const { name, price, category } = product;
            const sql = 'INSERT INTO products (name,price,category) VALUES($1, $2, $3) RETURNING *';
            const connection = await database_1.default.connect();
            const { rows } = await connection.query(sql, [name, price, category]);
            connection.release();
            return rows[0];
        }
        catch (error) {
            if (error instanceof Error) {
                throw new globalErrorHandler_1.BadRequest(error.message);
            }
            throw new globalErrorHandler_1.CustomError('something went wrong');
        }
    }
    async index() {
        try {
            const sql = 'SELECT * FROM products';
            const connection = await database_1.default.connect();
            const { rows } = await connection.query(sql);
            connection.release();
            return rows;
        }
        catch (error) {
            if (error instanceof Error) {
                throw new globalErrorHandler_1.CustomError(error.message);
            }
            throw new globalErrorHandler_1.CustomError('something went wrong');
        }
    }
    async show(id) {
        try {
            const sql = 'SELECT * FROM products WHERE id = $1';
            const connection = await database_1.default.connect();
            const { rows } = await connection.query(sql, [id]);
            connection.release();
            return rows[0];
        }
        catch (error) {
            throw new globalErrorHandler_1.CustomError(`Product with id '${id}' cannot be fetched from database: ${error}`);
        }
    }
    async showCategory(category) {
        try {
            const sql = 'SELECT * FROM products WHERE category = $1';
            const connection = await database_1.default.connect();
            const { rows } = await connection.query(sql, [category]);
            connection.release();
            return rows;
        }
        catch (error) {
            throw new globalErrorHandler_1.CustomError(`Database error: ${error}`);
        }
    }
    async delete(id) {
        try {
            const sql = 'DELETE FROM products WHERE id = $1';
            const connection = await database_1.default.connect();
            const { rows } = await connection.query(sql, [id]);
            connection.release();
            return rows[0];
        }
        catch (error) {
            throw new globalErrorHandler_1.CustomError(`Database error: ${error}`);
        }
    }
}
exports.Product = Product;
