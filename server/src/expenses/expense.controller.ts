import "dotenv/config";
import asyncHandler from "../middleware/asyncHandler.js";
import express, { Response } from "express";
import { CustomError } from "../middleware/errorHandler.js";
import expenseService from "./expense.service.js";
import { ExpenseType } from "../type/global.js";

const expenseController = {
  addExpense: asyncHandler(async (req: express.Request, res: Response) => {
    const requestBody = {
      amounts: req.body.amounts as number,
      category: req.body.category as string,
      businessName: req.body.businessName as string,
      owner: req.body.owner as string,
      groupId: req.body.currentGroupId as string,
      date: req.body.date as Date,
      isRecurring: req.body.isRecurring as boolean,
    };

    if (!(requestBody as ExpenseType)) {
      throw new CustomError({
        status: 400,
        message: "요청 항목이 다릅니다.",
      });
    }
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
  getExpense: asyncHandler(async (req: express.Request, res: Response) => {
    const { owner, currentGroupId, cursor, limit, startDate, endDate } =
      req.query;
    const expenses = await expenseService.getExpenses({
      owner: owner as string,
      groupId: currentGroupId,
      cursor: Number(cursor),
      limit: Number(limit),
      startDate: startDate,
      endDate: endDate,
    });

    res.json(expenses);
  }),
  getExpensesAmount: asyncHandler(
    async (req: express.Request, res: Response) => {
      const { owner, currentGroupId, startDate, endDate } = req.query;
      const expenses = await expenseService.getExpensesByOption({
        owner: owner as string,
        groupId: currentGroupId,
        startDate: startDate,
        endDate: endDate,
      });

      if (expenses.length === 0) {
        res.json(0);
        return;
      }

      res.json(expenses[0].totalAmounts);
    },
  ),

  updateExpense: asyncHandler(async (req: express.Request, res: Response) => {
    const requestBody = {
      amounts: req.body.amounts as number,
      businessName: req.body.businessName as string,
      date: req.body.date as Date,
      category: req.body.category as string,
      owner: req.body.owner as string,
      isRecurring: req.body.isRecurring as boolean,
      expenseId: req.params.id as string,
    };

    if (
      !(requestBody as Omit<ExpenseType, "groupId"> & { expenseId: string })
    ) {
      throw new CustomError({
        status: 400,
        message: "요청 항목이 다릅니다.",
      });
    }

    const result = await expenseService.updateExpense(requestBody);

    if (!result) {
      throw new CustomError({
        status: 400,
        message: "지출 내역 수정에 실패했습니다.",
      });
    }
    res.status(200).json({
      message: "지출 내역 수정에 성공했습니다.",
      asset: result,
    });
  }),

  deleteExpense: asyncHandler(async (req: express.Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
      throw new CustomError({
        status: 400,
        message: "요청에 필요한 정보가 부족합니다.",
      });
    }
    const result = await expenseService.deleteExpense({ id });
    if (result) res.status(204).end();
  }),
};

export default expenseController;
