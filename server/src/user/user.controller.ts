import "dotenv/config";
import asyncHandler from "../middleware/asyncHandler.js";
import express, { Response } from "express";
import { CustomError } from "../middleware/errorHandler.js";
import userService from "./user.service.js";
import { ObjectId } from "mongodb";

const userController = {
  getGroupInfo: asyncHandler(async (req: express.Request, res: Response) => {
    const { id } = req.params;
    const result = await userService.getUser(id as unknown as ObjectId);

    if (!result) {
      throw new CustomError({
        status: 404,
        message: "사용자를 찾을 수 없습니다.",
      });
    }

    const groupInfo = await userService.getUserGroup({
      groupId: result.groups,
    });

    // const groups = await result.groups.map( async (group) => {
    //   const groupInfo = await groupService.getGroup(group as unknown as string);
    //   console.log(groupInfo);
    //   return groupInfo;
    // });

    res.status(200).json({
      message: "그룹 조회에 성공했습니다.",
      groups: groupInfo,
    });
  }),
};

export default userController;
