import { Router } from "express";
import expenseController from "./expense.controller.js";
import { validateToken } from "../middleware/validateToken.js";

const expenseRouter = Router();

expenseRouter.post("/", validateToken, expenseController.addExpense);

expenseRouter.get("/", expenseController.getExpense);

expenseRouter.put("/:id", validateToken, expenseController.updateExpense);

expenseRouter.delete("/:id", validateToken, expenseController.deleteExpense);

expenseRouter.get("/amounts", expenseController.getExpensesAmount);

export default expenseRouter;
