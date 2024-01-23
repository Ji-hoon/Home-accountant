import { Router } from "express";
import assetController from "./asset.controller.js";

const assetRouter = Router();

assetRouter.post("/", assetController.addAsset);

assetRouter.get("/", assetController.getAsset);

export default assetRouter;
