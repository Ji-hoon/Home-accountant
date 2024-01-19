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
    const target = owner ? { owner: owner } : {};

    const result = await expenseModel
      .find(target, {
        amounts: 1,
        businessName: 1,
        date: 1,
        category: 1,
        owner: 1,
        isRecurring: 1,
        _id: 1,
      })
      .skip(cursor)
      .limit(limit)
      .sort({ createdAt: -1 });

    // console.log(owner, cursor, limit, result);

    return result;
  },
  async getExpensesByOption({
    //TODO: 추후 owner가 아닌 group으로도 조회 가능하게 변경
    owner,
  }: {
    owner?: string;
  }) {
    const target = owner ? { owner: owner } : {};

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
