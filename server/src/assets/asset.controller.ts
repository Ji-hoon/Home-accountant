import "dotenv/config";
import asyncHandler from "../middleware/asyncHandler.js";
import express, { Response } from "express";
import { AssetType } from "../type/global.js";
import { CustomError } from "../middleware/errorHandler.js";
import assetService from "./asset.service.js";
import { parse } from "date-fns";
import expenseService from "../expenses/expense.service.js";

const assetController = {
  addAsset: asyncHandler(async (req: express.Request, res: Response) => {
    const requestBody = {
      amounts: req.body.amounts as number,
      name: req.body.name as string,
      owner: req.body.owner as string,
      groupId: req.body.currentGroupId,
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
    const { owner, currentGroupId, startDate, endDate } = req.query;

    const assets = await assetService.getAssets({
      owner: owner as string,
      groupId: currentGroupId,
      startDate: startDate,
      endDate: endDate,
    });
    res.json(assets);
  }),

  getAssetAmounts: asyncHandler(async (req: express.Request, res: Response) => {
    const { owner, currentGroupId, startDate, endDate } = req.query;
    const assets = await assetService.getAssetsByOption({
      owner: owner as string,
      groupId: currentGroupId,
      startDate: startDate,
      endDate: endDate,
    });

    if (assets.length === 0) {
      res.json(0);
      return;
    }

    const accExpenses = await expenseService.getExpensesByOption({
      owner: owner as string,
      //startDate: format(assets[0].lastDate, "yyyy-MM-dd"),
      startDate: startDate,
      endDate: endDate,
    });

    const assetTotal = assets.reduce((acc, asset) => {
      return acc + asset.totalAmounts;
    }, 0);

    const expenseTotal =
      accExpenses.length !== 0 ? accExpenses[0].totalAmounts : 0;

    //console.log(assetTotal, expenseTotal);
    res.json(assetTotal - expenseTotal);
  }),

  updateAsset: asyncHandler(async (req: express.Request, res: Response) => {
    const requestBody = {
      amounts: req.body.amounts as number,
      name: req.body.name as string,
      assetType: req.body.assetType as string,
      owner: req.body.owner as string,
      assetId: req.params.id as string,
    };

    const result = await assetService.updateAsset(requestBody);

    if (!result) {
      throw new CustomError({
        status: 400,
        message: "자산 항목 수정에 실패했습니다.",
      });
    }
    res.status(200).json({
      message: "자산 항목 수정에 성공했습니다.",
      asset: result,
    });
  }),
};

export default assetController;
