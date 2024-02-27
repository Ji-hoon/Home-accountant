import { Router } from "express";
import assetTypesController from "./asset_types.controller.js";
import { validateToken } from "../middleware/validateToken.js";
import { validateRequestBody } from "../middleware/validateRequestBody.js";

const assetTypesRouter = Router();

assetTypesRouter.post(
  "/",
  validateToken,
  validateRequestBody,
  assetTypesController.addAssetType,
);

assetTypesRouter.put(
  "/:assetTypeId",
  validateToken,
  validateRequestBody,
  assetTypesController.updateAssetType,
);

assetTypesRouter.get("/", assetTypesController.getGroupAssetType);

export default assetTypesRouter;
