import "dotenv/config";
import asyncHandler from "../middleware/asyncHandler.js";
import express, { Response } from "express";
import { CustomError } from "../middleware/errorHandler.js";
import expenseService from "./expense.service.js";
import { ExpenseType } from "../type/global.js";

const expenseController = {
  addExpense: asyncHandler(async (req: express.Request, res: Response) => {
    const requestBody = req.body;
    if (!(requestBody as ExpenseType)) {
      throw new CustomError({
        status: 400,
        message: "요청 항목이 다릅니다.",
      });
    }
    const result = await expenseService.addExpense(requestBody);
    console.log(result);
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
  getExpense: asyncHandler(async (req: express.Request, res: Response) => {
    const { owner, cursor, limit } = req.query;
    const expenses = await expenseService.getExpenses({
      owner: owner as string,
      cursor: Number(cursor),
      limit: Number(limit),
    });

    res.json(expenses);
  }),
  getExpensesAmount: asyncHandler(
    async (req: express.Request, res: Response) => {
      const { owner } = req.query;
      const expenses = await expenseService.getExpensesByOption({
        owner: owner as string,
      });

      if (expenses.length === 0) {
        res.json(0);
        return;
      }

      res.json(expenses[0].totalAmounts);
    },
  ),
};

export default expenseController;
