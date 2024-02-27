import { Router } from "express";
import categoriesController from "./categories.controller.js";
import { validateToken } from "../middleware/validateToken.js";
import { validateRequestBody } from "../middleware/validateRequestBody.js";

const categoriesRouter = Router();

categoriesRouter.post(
  "/",
  validateToken,
  validateRequestBody,
  categoriesController.addCategory,
);

categoriesRouter.put(
  "/:categoryId",
  validateToken,
  validateRequestBody,
  categoriesController.updateCategory,
);

categoriesRouter.get("/", categoriesController.getGroupCategory);

export default categoriesRouter;
