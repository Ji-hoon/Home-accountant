import "dotenv/config";
import asyncHandler from "../middleware/asyncHandler.js";
import express, { Response } from "express";
import { CustomError } from "../middleware/errorHandler.js";
import categoriesService from "./categories.service.js";

const categoriesController = {
  addCategory: asyncHandler(async (req: express.Request, res: Response) => {
    const { name, groupId, type } = req.body;
    if (!name || !groupId || !type) {
      throw new CustomError({
        status: 400,
        message: "요청 항목이 다릅니다.",
      });
    }

    const result = await categoriesService.addCategory({ name, groupId, type });

    if (!result) {
      throw new CustomError({
        status: 400,
        message: "지출 카테고리 생성에 실패했습니다.",
      });
    }
    res.status(201).json({
      message: "지출 카테고리 생성에 성공했습니다.",
      category: result,
    });
  }),
};

export default categoriesController;
