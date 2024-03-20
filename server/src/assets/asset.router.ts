import { Router } from "express";
import assetController from "./asset.controller.js";
import { validateToken } from "../middleware/validateToken.js";
import { validateRequestBody } from "../middleware/validateRequestBody.js";

const assetRouter = Router();

assetRouter.post(
  "/",
  validateToken,
  validateRequestBody,
  assetController.addAsset,
);

assetRouter.get("/", assetController.getAsset);

assetRouter.get("/amounts", assetController.getAssetAmounts);

assetRouter.put(
  "/:id",
  validateToken,
  validateRequestBody,
  assetController.updateAsset,
);

export default assetRouter;
