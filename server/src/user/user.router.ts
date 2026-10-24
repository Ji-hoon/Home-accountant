import { Router } from "express";
import userController from "./user.controller.js";

const userRouter = Router();

userRouter.get("/:id/groups", userController.getGroupInfo);

export default userRouter;
