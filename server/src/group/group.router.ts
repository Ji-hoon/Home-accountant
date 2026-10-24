import { Router } from "express";
import groupController from "./group.controller.js";
import { validateToken } from "../middleware/validateToken.js";
import { validateRequestBody } from "../middleware/validateRequestBody.js";

const groupRouter = Router();

groupRouter.post("/", validateToken, groupController.addGroup);

groupRouter.get("/:id", groupController.getGroup);

groupRouter.get("/", groupController.getGroupByCode);

groupRouter.put(
  "/:id",
  validateToken,
  validateRequestBody,
  groupController.updateGroup,
);

groupRouter.put(
  "/:id/invite",
  validateToken,
  groupController.inviteMemberToGroup,
);

groupRouter.put(
  "/:groupId/members",
  validateToken,
  groupController.addMemberToGroup,
);

export default groupRouter;
