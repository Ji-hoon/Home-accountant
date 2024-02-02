import { Router } from "express";
import authController from "./auth.controller.js";

const authRouter = Router();

authRouter.get("/kakao", authController.getKakaoAuthCode);

authRouter.get("/oauth", authController.handleKakaoOAuthProcess);

authRouter.post("/login", authController.handleLogin);

authRouter.post("/logout", authController.handleLogout);

authRouter.post("/join", authController.handleJoin);

export default authRouter;
