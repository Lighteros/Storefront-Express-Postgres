import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
const errorHandlerMiddleware = (error: any, req: Request, res: Response, _next: NextFunction) => {
  // console.log(6, error.code);

  const customError = {
    status: error.status || StatusCodes.INTERNAL_SERVER_ERROR,
    message: error.message || 'Something went wrong, try again later',
  };

  if (error.code === '22P02') {
    customError.message = `Wrong Data type: ${error.message}`;
    customError.status = StatusCodes.BAD_REQUEST;
  }

  if (error.code === '23502') {
    customError.message = `Database: ${error.message}`;
    customError.status = StatusCodes.BAD_REQUEST;
  }

  // if (error.name === 'ValidationError') {
  //   customError.message = Object.values(error.errors)
  //     .map(item => {
  //       return item.message;
  //     })
  //     .join(',');

  //   customError.statusCode = StatusCodes.BAD_REQUEST;
  // }

  // if (error.name === 'CastError') {
  //   customError.message = `No item found with id: ${error.value}`;
  //   customError.statusCode = StatusCodes.NOT_FOUND;
  // }

  return res.status(customError.status).json({
    status: false,
    message: customError.message,
    // error,
  });

  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
  //   status: false,
  //   message: 'Something went wrong',
  //   error,
  // });
};

export default errorHandlerMiddleware;
