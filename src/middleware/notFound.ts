import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const notFoundHandler = (req: Request, res: Response) => {
  res.status(StatusCodes.NOT_FOUND).json({
    status: false,
    message: `Route not found: The url is ${req.url}`,
  });
};

export default notFoundHandler;
