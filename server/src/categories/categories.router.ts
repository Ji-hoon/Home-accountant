import { Router } from "express";
import categoriesController from "./categories.controller.js";

const categoriesRouter = Router();

categoriesRouter.post("/", categoriesController.addCategory);

categoriesRouter.put("/:categoryId", categoriesController.updateCategory);

export default categoriesRouter;
