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
