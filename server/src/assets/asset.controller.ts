import "dotenv/config";
import asyncHandler from "../middleware/asyncHandler.js";
import express, { Response } from "express";
import { AssetType } from "../type/global.js";
import { CustomError } from "../middleware/errorHandler.js";
import assetService from "./asset.service.js";
import { parse } from "date-fns";

const assetController = {
  addAsset: asyncHandler(async (req: express.Request, res: Response) => {
    const requestBody = {
      amounts: req.body.amounts as number,
      name: req.body.name as string,
      owner: req.body.owner as string,
      assetType: req.body.assetType as string,
      assetHistory: [
        {
          date: parse(
            req.body.assetHistory.date as string,
            "yyyy-MM-dd",
            new Date(),
          ),
          amounts: req.body.amounts as number,
          _id: null, //TODO: 객체 생성 시 자동으로 _id가 할당되서 null로 명시
        },
      ],
    };
    if (!(requestBody as AssetType)) {
      throw new CustomError({
        status: 400,
        message: "요청 항목이 다릅니다.",
      });
    }

    const result = await assetService.addAsset(requestBody);

    if (!result) {
      throw new CustomError({
        status: 400,
        message: "자산 항목 생성에 실패했습니다.",
      });
    }
    res.status(201).json({
      message: "자산 항목 생성에 성공했습니다.",
      asset: result,
    });
  }),

  getAsset: asyncHandler(async (req: express.Request, res: Response) => {
    const { owner, startDate, endDate } = req.query;
    res.json({ owner, startDate, endDate });
  }),

  getAssetAmounts: asyncHandler(async (req: express.Request, res: Response) => {
    const { owner, startDate, endDate } = req.query;
    const assets = await assetService.getAssetsByOption({
      owner: owner as string,
      startDate: startDate,
      endDate: endDate,
    });

    if (assets.length === 0) {
      res.json(0);
      return;
    }

    res.json(assets[0].totalAmounts);
  }),
};

export default assetController;
