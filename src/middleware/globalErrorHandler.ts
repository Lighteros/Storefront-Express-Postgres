import { StatusCodes } from 'http-status-codes';

class CustomError extends Error {
  status?: number;
  message: string;
  constructor(message: string, status?: number) {
    super(message);
    this.status = status;
    this.message = message;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

class UnauthenticatedError extends CustomError {
  constructor(message: string) {
    super(message);
    this.status = StatusCodes.UNAUTHORIZED;
  }
}

class BadRequest extends CustomError {
  constructor(message: string) {
    super(message);
    this.status = StatusCodes.BAD_REQUEST;
  }
}

class NotFound extends CustomError {
  constructor(message: string) {
    super(message);
    this.status = StatusCodes.NOT_FOUND;
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// function NotFound(error: any, req: Request, res: Response, next: NextFunction) {
//   const status = error.status || 500;
//   const message = error.message || 'something went wrong';
//   console.log(error.code);
//   res.status(status).json({
//     status: false,
//     message,
//   });
// }

// export CustomError

export { NotFound, CustomError, UnauthenticatedError, BadRequest };
