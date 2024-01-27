import { Router } from "express";
import expenseController from "./expense.controller.js";

const expenseRouter = Router();

expenseRouter.post("/", expenseController.addExpense);

expenseRouter.get("/", expenseController.getExpense);

expenseRouter.put("/:id", expenseController.updateExpense);

expenseRouter.delete("/:id", expenseController.deleteExpense);

expenseRouter.get("/amounts", expenseController.getExpensesAmount);

export default expenseRouter;
