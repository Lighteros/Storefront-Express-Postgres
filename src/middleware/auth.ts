import { NextFunction, Request, Response } from 'express';
import { UnauthenticatedError } from './globalErrorHandler';
// import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

interface TokenInterface {
  username: string;
  id: number;
}

const authenticationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    next(new UnauthenticatedError('Invalid authorization'));
    return;
  }

  const token = authHeader.split(' ')[1];
  try {
    jwt.verify(token, 'secret') as TokenInterface;
    // const { username, id } = decoded;
    // req.user = { username, id };
    next();
  } catch (error) {
    if (error instanceof Error) {
      next(new UnauthenticatedError('Invalid user'));
    }
  }
};

export default authenticationMiddleware;
