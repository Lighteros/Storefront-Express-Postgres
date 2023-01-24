"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
/* eslint-disable no-useless-catch */
const database_1 = __importDefault(require("../database"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const globalErrorHandler_1 = require("../middleware/globalErrorHandler");
class User {
    async register(user) {
        try {
            const { username, firstname, lastname, password } = user;
            const userExistsSql = `SELECT username FROM users WHERE username = $1`;
            const sql = 'INSERT INTO users (username,firstname,lastname,password) VALUES($1, $2, $3, $4) RETURNING *';
            const connection = await database_1.default.connect();
            const data = await connection.query(userExistsSql, [username]);
            if (data.rows.length >= 1) {
                throw new globalErrorHandler_1.BadRequest(`Username is in use`);
            }
            const salt = await bcryptjs_1.default.genSalt(10);
            const hashedPassword = await bcryptjs_1.default.hash(password, salt);
            const { rows } = await connection.query(sql, [username, firstname, lastname, hashedPassword]);
            connection.release();
            return rows[0];
        }
        catch (error) {
            if (error instanceof Error) {
                throw new globalErrorHandler_1.BadRequest(error.message);
            }
            throw new globalErrorHandler_1.CustomError('something went wrong', 500);
        }
    }
    async login(username) {
        try {
            const sql = 'SELECT * FROM users WHERE username=($1)';
            const connection = await database_1.default.connect();
            const { rows } = await connection.query(sql, [username]);
            connection.release();
            return rows[0];
        }
        catch (error) {
            if (error instanceof Error) {
                throw new globalErrorHandler_1.CustomError(error.message);
            }
            else {
                throw new globalErrorHandler_1.CustomError('Something went wrong');
            }
        }
    }
    async getUsers() {
        try {
            const sql = 'SELECT * FROM users';
            const connection = await database_1.default.connect();
            const { rows } = await connection.query(sql);
            connection.release();
            return rows;
        }
        catch (error) {
            throw error;
        }
    }
    async getUser(id) {
        try {
            const sql = 'SELECT * FROM users WHERE id = ($1)';
            const connection = await database_1.default.connect();
            const { rows } = await connection.query(sql, [id]);
            connection.release();
            return rows[0];
        }
        catch (error) {
            throw error;
        }
    }
    async deleteUser(id) {
        try {
            const sql = 'DELETE FROM users WHERE id = $1';
            const connection = await database_1.default.connect();
            const { rows } = await connection.query(sql, [id]);
            connection.release();
            return rows[0];
        }
        catch (error) {
            throw error;
        }
    }
    async updateUser(firstname, lastname, id) {
        try {
            const sql = 'UPDATE users SET firstname = $1, lastname = $2 WHERE id = $3 RETURNING  *';
            const connection = await database_1.default.connect();
            const { rows } = await connection.query(sql, [firstname, lastname, id]);
            connection.release();
            return rows[0];
        }
        catch (error) {
            throw error;
        }
    }
}
exports.User = User;
