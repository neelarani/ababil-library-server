import { NextFunction, Request, Response } from 'express';
import { customError } from '../interfaces/customError.interface';

function globalErrorHandler(
  err: customError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(err);
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';
  res.status(statusCode).json({
    success: false,
    error: message,
  });
}

export default globalErrorHandler;
