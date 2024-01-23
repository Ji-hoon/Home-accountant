import expenseModel from "./expense.model.js";
import { ExpenseType } from "../type/global.js";
import { ParsedQs } from "qs";
import { parseStringyyyyMMddToDate } from "../utils/parseDate.js";

const expenseService = {
  async getExpenses({
    owner,
    cursor,
    limit,
    startDate,
    endDate,
  }: {
    owner: string;
    cursor: number;
    limit: number;
    startDate: string | ParsedQs | undefined | string[] | ParsedQs[];
    endDate: string | ParsedQs | undefined | string[] | ParsedQs[];
  }) {
    const startDateFormat = parseStringyyyyMMddToDate(startDate as string);
    const endDateFormat = parseStringyyyyMMddToDate(endDate as string);

    const target = owner ? { owner: owner } : {};

    const result = await expenseModel
      .find(
        {
          ...target,
          date: {
            $gte: startDateFormat,
            $lte: endDateFormat,
          },
        },
        {
          amounts: 1,
          businessName: 1,
          date: 1,
          category: 1,
          owner: 1,
          isRecurring: 1,
          _id: 1,
        },
      )
      .skip(cursor)
      .limit(limit)
      .sort({ date: -1 });

    return result;
  },

  async getExpensesByOption({
    //TODO: 추후 owner가 아닌 group으로도 조회 가능하게 변경
    owner,
    startDate,
    endDate,
  }: {
    owner?: string;
    startDate: string | ParsedQs | undefined | string[] | ParsedQs[];
    endDate: string | ParsedQs | undefined | string[] | ParsedQs[];
  }) {
    const startDateFormat = parseStringyyyyMMddToDate(startDate as string);
    const endDateFormat = parseStringyyyyMMddToDate(endDate as string);

    const target = owner
      ? {
          owner: owner,
          date: {
            $gte: startDateFormat,
            $lte: endDateFormat,
          },
        }
      : {
          date: {
            $gte: startDateFormat,
            $lte: endDateFormat,
          },
        };

    return await expenseModel.aggregate([
      {
        $match: target,
      },
      {
        $group: {
          _id: null,
          totalAmounts: { $sum: "$amounts" },
        },
      },
    ]);
  },

  async addExpense({
    amounts,
    businessName,
    date,
    category,
    owner,
    isRecurring,
  }: ExpenseType) {
    const newExpense = {
      amounts,
      businessName,
      date,
      category,
      owner,
      isRecurring,
    };
    return await expenseModel.create(newExpense);
  },
};

export default expenseService;
