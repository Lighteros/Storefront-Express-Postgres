"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.deleteUser = exports.getUser = exports.getUsers = void 0;
const User_1 = require("../../models/User");
const http_status_codes_1 = require("http-status-codes");
const globalErrorHandler_1 = require("../../middleware/globalErrorHandler");
const userModel = new User_1.User();
const getUsers = async (req, res, next) => {
    try {
        const users = await userModel.getUsers();
        res.status(http_status_codes_1.StatusCodes.OK).json({
            status: true,
            message: 'Users fetched successfully',
            result: users.length,
            users,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getUsers = getUsers;
const getUser = async (req, res, next) => {
    try {
        const userID = req.params.userID;
        const user = await userModel.getUser(userID);
        if (!user) {
            return next(new globalErrorHandler_1.NotFound('User not found'));
        }
        res.status(http_status_codes_1.StatusCodes.OK).json({
            status: true,
            message: 'User fetched successfully',
            user,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getUser = getUser;
const deleteUser = async (req, res, next) => {
    try {
        const userID = req.params.userID;
        const isUserExist = await userModel.getUser(userID);
        if (!isUserExist) {
            return next(new globalErrorHandler_1.NotFound(`User not found.`));
        }
        await userModel.deleteUser(userID);
        res.status(http_status_codes_1.StatusCodes.OK).json({
            status: true,
            message: 'User deleted successfully',
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteUser = deleteUser;
const updateUser = async (req, res, next) => {
    try {
        const userID = req.params.userID;
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        if (![firstname, lastname].every(Boolean)) {
            return next(new globalErrorHandler_1.NotFound(`all fields required`));
        }
        const isUserExist = await userModel.getUser(userID);
        if (!isUserExist) {
            return next(new globalErrorHandler_1.NotFound(`User not found.`));
        }
        const updatedUser = await userModel.updateUser(firstname, lastname, userID);
        res.status(http_status_codes_1.StatusCodes.OK).json({
            status: true,
            message: 'User deleted successfully',
            user: updatedUser,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateUser = updateUser;
