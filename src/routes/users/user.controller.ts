/* eslint-disable no-useless-catch */
import { NextFunction, Request, Response } from 'express';
import { User } from '../../models/User';
import { StatusCodes } from 'http-status-codes';
import { NotFound } from '../../middleware/globalErrorHandler';

const userModel = new User();

const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users = await userModel.getUsers();
    res.status(StatusCodes.OK).json({
      status: true,
      message: 'Users fetched successfully',
      result: users.length,
      users,
    });
  } catch (error) {
    next(error);
  }
};

const getUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userID = req.params.userID as unknown as number;
    const user = await userModel.getUser(userID);
    if (!user) {
      return next(new NotFound('User not found'));
    }
    res.status(StatusCodes.OK).json({
      status: true,
      message: 'User fetched successfully',
      user,
    });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userID = req.params.userID as unknown as number;
    const isUserExist = await userModel.getUser(userID);

    if (!isUserExist) {
      return next(new NotFound(`User not found.`));
    }
    await userModel.deleteUser(userID);
    res.status(StatusCodes.OK).json({
      status: true,
      message: 'User deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userID = req.params.userID as unknown as number;
    const firstname = req.body.firstname as unknown as string;
    const lastname = req.body.lastname as unknown as string;

    if (![firstname, lastname].every(Boolean)) {
      return next(new NotFound(`all fields required`));
    }
    const isUserExist = await userModel.getUser(userID);
    if (!isUserExist) {
      return next(new NotFound(`User not found.`));
    }
    const updatedUser = await userModel.updateUser(firstname, lastname, userID);
    res.status(StatusCodes.OK).json({
      status: true,
      message: 'User deleted successfully',
      user: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

export { getUsers, getUser, deleteUser, updateUser };
