import { Router } from "express";
import assetTypesController from "./asset_types.controller.js";

const assetTypesRouter = Router();

assetTypesRouter.post("/", assetTypesController.addAssetType);

assetTypesRouter.put("/:assetTypeId", assetTypesController.updateAssetType);

assetTypesRouter.get("/", assetTypesController.getGroupAssetType);

export default assetTypesRouter;
