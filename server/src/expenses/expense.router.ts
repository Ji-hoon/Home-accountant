import { Router } from "express";
import expenseController from "./expense.controller.js";
import { validateToken } from "../middleware/validateToken.js";
import { validateRequestBody } from "../middleware/validateRequestBody.js";

const expenseRouter = Router();

expenseRouter.post(
  "/",
  validateToken,
  validateRequestBody,
  expenseController.addExpense,
);

expenseRouter.get("/", expenseController.getExpense);

expenseRouter.put(
  "/:id",
  validateToken,
  validateRequestBody,
  expenseController.updateExpense,
);

expenseRouter.delete("/:id", validateToken, expenseController.deleteExpense);

expenseRouter.get("/amounts", expenseController.getExpensesAmount);

export default expenseRouter;
