import express from 'express';
import { login, registerUser } from './auth.controller';

const authRoute = express.Router();

authRoute.post('/register', registerUser);
authRoute.post('/login', login);

export default authRoute;
