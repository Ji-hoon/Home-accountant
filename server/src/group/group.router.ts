import { Router } from "express";
import groupController from "./group.controller.js";

const groupRouter = Router();

groupRouter.post("/", groupController.addGroup);

groupRouter.get("/:id", groupController.getGroup);

export default groupRouter;
