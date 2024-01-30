import expenseModel from "./expense.model.js";
import { ExpenseType } from "../type/global.js";
import { ParsedQs } from "qs";
import { parseStringyyyyMMddToDate } from "../utils/parseDate.js";
import { Types } from "mongoose";
const ObjectId = Types.ObjectId;

const expenseService = {
  async getExpenses({
    owner,
    groupId,
    cursor,
    limit,
    startDate,
    endDate,
  }: {
    owner: string;
    groupId: string | ParsedQs | undefined | string[] | ParsedQs[];
    cursor: number;
    limit: number;
    startDate: string | ParsedQs | undefined | string[] | ParsedQs[];
    endDate: string | ParsedQs | undefined | string[] | ParsedQs[];
  }) {
    const startDateFormat = parseStringyyyyMMddToDate(startDate as string);
    const endDateFormat = parseStringyyyyMMddToDate(endDate as string);

    const target = owner
      ? {
          owner: owner,
          groupId: new ObjectId(groupId as string),
        }
      : {
          groupId: new ObjectId(groupId as string),
        };

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
    groupId,
    startDate,
    endDate,
  }: {
    owner?: string;
    groupId: string | ParsedQs | undefined | string[] | ParsedQs[];
    startDate: string | ParsedQs | undefined | string[] | ParsedQs[];
    endDate: string | ParsedQs | undefined | string[] | ParsedQs[];
  }) {
    const startDateFormat = parseStringyyyyMMddToDate(startDate as string);
    const endDateFormat = parseStringyyyyMMddToDate(endDate as string);

    const target = owner
      ? {
          owner: owner,
          groupId: new ObjectId(groupId as string),
          date: {
            $gte: startDateFormat,
            $lte: endDateFormat,
          },
        }
      : {
          groupId: new ObjectId(groupId as string),
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
    groupId,
    isRecurring,
  }: ExpenseType) {
    const newExpense = {
      amounts,
      businessName,
      date,
      category,
      owner,
      groupId,
      isRecurring,
    };
    return await expenseModel.create(newExpense);
  },

  async updateExpense({
    amounts,
    businessName,
    date,
    category,
    owner,
    isRecurring,
    expenseId,
  }: Omit<ExpenseType, "groupId"> & { expenseId: string }) {
    //const currentExpense = await expenseModel.findOne({ _id: expenseId });
    const updatedExpense = await expenseModel.findByIdAndUpdate(
      { _id: expenseId },
      {
        amounts,
        businessName,
        date,
        category,
        owner,
        isRecurring,
      },
      {
        new: true,
      },
    );
    return updatedExpense;
  },

  async deleteExpense({ id }: { id: string }) {
    const deleteFeedResult = await expenseModel.findByIdAndDelete(id);

    if (!deleteFeedResult) throw new Error("삭제 실패");
    return deleteFeedResult;
  },
};

export default expenseService;
