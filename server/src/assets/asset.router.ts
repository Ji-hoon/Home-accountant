import { Router } from "express";
import assetController from "./asset.controller.js";
import { validateToken } from "../middleware/validateToken.js";

const assetRouter = Router();

assetRouter.post("/", validateToken, assetController.addAsset);

assetRouter.get("/", assetController.getAsset);

assetRouter.get("/amounts", assetController.getAssetAmounts);

assetRouter.put("/:id", validateToken, assetController.updateAsset);

export default assetRouter;
