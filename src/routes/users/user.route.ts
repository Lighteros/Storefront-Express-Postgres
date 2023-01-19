import express from 'express';
import { deleteUser, getUser, getUsers, updateUser } from './user.controller';
import authenticationMiddleware from '../../middleware/auth';

const userRoute = express.Router();

userRoute.get('/', authenticationMiddleware, getUsers);
userRoute.get('/:userID', authenticationMiddleware, getUser);
userRoute.delete('/:userID', authenticationMiddleware, deleteUser);
userRoute.patch('/:userID', authenticationMiddleware, updateUser);

export default userRoute;
