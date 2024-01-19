import { Router } from "express";
import expenseController from "./expense.controller.js";

const expenseRouter = Router();

expenseRouter.post("/", expenseController.addExpense);

expenseRouter.get("/", expenseController.getExpense);

export default expenseRouter;
