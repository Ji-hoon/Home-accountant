import { Router } from "express";
import categoriesController from "./categories.controller.js";
import { validateToken } from "../middleware/validateToken.js";

const categoriesRouter = Router();

categoriesRouter.post("/", validateToken, categoriesController.addCategory);

categoriesRouter.put(
  "/:categoryId",
  validateToken,
  categoriesController.updateCategory,
);

categoriesRouter.get("/", categoriesController.getGroupCategory);

export default categoriesRouter;
