import { Router } from "express";
import assetTypesController from "./asset_types.controller.js";
import { validateToken } from "../middleware/validateToken.js";

const assetTypesRouter = Router();

assetTypesRouter.post("/", validateToken, assetTypesController.addAssetType);

assetTypesRouter.put(
  "/:assetTypeId",
  validateToken,
  assetTypesController.updateAssetType,
);

assetTypesRouter.get("/", assetTypesController.getGroupAssetType);

export default assetTypesRouter;
