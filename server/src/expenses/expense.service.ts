import expenseModel from "./expense.model.js";
import { ExpenseType } from "../type/global.js";

const expenseService = {
  async getExpenses(_id: string) {
    return expenseModel.find({ owner: _id });
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
