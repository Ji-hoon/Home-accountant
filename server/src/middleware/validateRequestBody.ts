import { Request, Response, NextFunction } from "express";
import { CustomError } from "./errorHandler.js";

export function validateRequestBody(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const values = Object.values(req.body);
  values.forEach((value) => {
    if (value === "") {
      throw new CustomError({
        status: 400,
        message: "필드를 모두 입력해주세요.",
      });
    }
  });
  next();
}
