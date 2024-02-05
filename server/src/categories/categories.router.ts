import { Router } from "express";
import categoriesController from "./categories.controller.js";

const categoriesRouter = Router();

categoriesRouter.post("/", categoriesController.addCategory);

categoriesRouter.put("/:categoryId", categoriesController.updateCategory);

categoriesRouter.get("/", categoriesController.getGroupCategory);

export default categoriesRouter;
