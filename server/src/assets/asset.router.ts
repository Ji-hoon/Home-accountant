import { Router } from "express";
import assetController from "./asset.controller.js";

const assetRouter = Router();

assetRouter.post("/", assetController.addAsset);

assetRouter.get("/", assetController.getAsset);

assetRouter.get("/amounts", assetController.getAssetAmounts);

assetRouter.put("/:id", assetController.updateAsset);

export default assetRouter;
