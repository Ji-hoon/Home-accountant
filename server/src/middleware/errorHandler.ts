import { NextFunction, Request, Response } from "express";

export class CustomError extends Error {
  status: number;
  message: string;
  constructor({ status, message }: { status: number; message: string }) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) {
  res.locals.errorMessage = err.message; // logger middleware에 에러 메시지를 전달하기 위함

  return res.status(err instanceof CustomError ? err.status : 500).json({
    result: "fail",
    error: err.message || "undefined error",
  });
}

export default errorHandler;
