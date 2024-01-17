import "dotenv/config";
import asyncHandler from "../middleware/asyncHandler.js";
import express, { Response } from "express";
import { CustomError } from "../middleware/errorHandler.js";
import expenseService from "./expense.service.js";

const expenseController = {
  addExpense: asyncHandler(async (req: express.Request, res: Response) => {
    const requestBody = req.body;
    const result = await expenseService.addExpense(requestBody);
    if (!result) {
      throw new CustomError({
        status: 400,
        message: "지출 내역 생성에 실패했습니다.",
      });
    }
    res.status(201).json({
      message: "지출 내역 생성에 성공했습니다.",
      expense: result,
    });
  }),
};

export default expenseController;
