import "dotenv/config";
import asyncHandler from "../middleware/asyncHandler.js";
import express, { Response } from "express";
// import { CustomError } from "../middleware/errorHandler.js";
// import categoriesService from "./categories.service.js";

const assetTypesController = {
  addAssetType: asyncHandler(async (req: express.Request, res: Response) => {
    const { name, groupId } = req.body;
    res.json({ name, groupId });
  }),
  updateAssetType: asyncHandler(async (req: express.Request, res: Response) => {
    const { assetTypeId } = req.params;
    const { name, groupId } = req.body;
    res.json({ assetTypeId, name, groupId });
  }),
  getGroupAssetType: asyncHandler(
    async (req: express.Request, res: Response) => {
      const { assetTypeId } = req.query;
      res.json({ assetTypeId });
    },
  ),
};

export default assetTypesController;
