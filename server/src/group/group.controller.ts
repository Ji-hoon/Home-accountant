import "dotenv/config";
import asyncHandler from "../middleware/asyncHandler.js";
import express, { Response } from "express";
import { CustomError } from "../middleware/errorHandler.js";
import groupService from "./group.service.js";
import { GroupCreateType } from "../type/global.js";

const groupController = {
  addGroup: asyncHandler(async (req: express.Request, res: Response) => {
    const requestBody = req.body;
    if (!(requestBody as GroupCreateType)) {
      throw new CustomError({
        status: 400,
        message: "요청 항목이 다릅니다.",
      });
    }
    const result = await groupService.addGroup(requestBody);

    if (!result) {
      throw new CustomError({
        status: 400,
        message: "그룹 생성에 실패했습니다.",
      });
    }
    res.status(201).json({
      message: "그룹 생성에 성공했습니다.",
      group: result,
    });
  }),
  getGroup: asyncHandler(async (req: express.Request, res: Response) => {
    const requestBody = req.body;
    res.json(requestBody);
  }),
};

export default groupController;
