import expenseModel from "./expense.model.js";
import { ExpenseType } from "../type/global.js";

const expenseService = {
  async getExpenses({
    owner,
    cursor,
    limit,
  }: {
    owner: string;
    cursor: number;
    limit: number;
  }) {
    return await expenseModel
      .find({ owner: owner })
      .skip(cursor)
      .limit(limit)
      .sort({ createdAt: -1 });
  },
  async getExpensesByOption({
    //TODO: 추후 owner가 아닌 group으로도 조회 가능하게 변경
    owner,
  }: {
    owner?: string;
  }) {
    if (!owner) {
      return await expenseModel.aggregate([
        {
          $group: {
            _id: null,
            totalAmounts: { $sum: "$amounts" },
          },
        },
      ]);
    }

    return await expenseModel.aggregate([
      {
        $match: { owner: owner },
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
