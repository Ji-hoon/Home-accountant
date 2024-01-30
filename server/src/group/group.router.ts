import { Router } from "express";
import groupController from "./group.controller.js";

const groupRouter = Router();

groupRouter.post("/", groupController.addGroup);

groupRouter.get("/:id", groupController.getGroup);

groupRouter.get("/", groupController.getGroupByCode);

groupRouter.put("/:id", groupController.updateGroup);

groupRouter.put("/:id/:userId", groupController.addMemberToGroup);

export default groupRouter;
