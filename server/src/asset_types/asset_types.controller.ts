import "dotenv/config";
import asyncHandler from "../middleware/asyncHandler.js";
import express, { Response } from "express";
import { CustomError } from "../middleware/errorHandler.js";
import assetTypeService from "./asset_types.service.js";

const assetTypesController = {
  addAssetType: asyncHandler(async (req: express.Request, res: Response) => {
    const { name, groupId } = req.body;

    const result = await assetTypeService.addAssetType({
      name,
      groupId,
    });

    if (!result) {
      throw new CustomError({
        status: 400,
        message: "자산 항목 생성에 실패했습니다.",
      });
    }

    res.status(201).json({
      message: "자산 타입 생성에 성공했습니다.",
      assetType: result,
    });
  }),
  updateAssetType: asyncHandler(async (req: express.Request, res: Response) => {
    const { assetTypeId } = req.params;
    const { name, groupId } = req.body;
    const result = await assetTypeService.updateAssetType({
      assetTypeId,
      name,
      groupId,
    });

    if (!result) {
      throw new CustomError({
        status: 400,
        message: "자산 타입 수정에 실패했습니다.",
      });
    }

    res.status(201).json({
      message: "자산 타입 수정에 성공했습니다.",
      assetType: result,
    });
  }),
  getGroupAssetType: asyncHandler(
    async (req: express.Request, res: Response) => {
      const { groupId } = req.query;

      if (!groupId) {
        throw new CustomError({
          status: 400,
          message: "조회할 그룹 id가 없습니다.",
        });
      }

      const result = await assetTypeService.getGroupAssetType({ groupId });

      if (result.length === 0) {
        throw new CustomError({
          status: 400,
          message: "조회된 자산 타입이 없습니다.",
        });
      }
      res.status(200).json({
        message: "자산 타입 조회에 성공했습니다.",
        category: result,
      });
    },
  ),
};

export default assetTypesController;
