import "dotenv/config";
import asyncHandler from "../middleware/asyncHandler.js";
import express, { Response } from "express";

const assetController = {
  addAsset: asyncHandler(async (req: express.Request, res: Response) => {
    const { requestBody } = req.body;
    res.json({ requestBody });
  }),
  getAsset: asyncHandler(async (req: express.Request, res: Response) => {
    const { owner, startDate, endDate } = req.query;
    res.json({ owner, startDate, endDate });
  }),
};

export default assetController;
