import "dotenv/config";
import asyncHandler from "../middleware/asyncHandler.js";
import { CustomError } from "../middleware/errorHandler.js";
import express, { Response } from "express";
import authService from "./auth.service.js";
import userService from "../user/user.service.js";
import groupService from "../group/group.service.js";

const authController = {
  getKakaoAuthCode: asyncHandler(
    async (req: express.Request, res: Response) => {
      const REST_API_KEY = process.env.KAKAO_REST_API_KEY;
      const REDIRECT_URI = `${process.env.BACKEND_URL}/api/auth/oauth`;
      const authorizeURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile_nickname,profile_image`;
      res.redirect(authorizeURL);
    },
  ),
  handleKakaoOAuthProcess: asyncHandler(
    async (req: express.Request, res: Response) => {
      const code = await authService.validateKakaoOAuthCode(
        req.query.code as string,
      );
      const data = await authService.getKakaoAccessToken(code);
      const userInfo = await authService.getUserInfo(data.accessToken);
      const isNewUser = await userService.findUserWithSnsId(userInfo.id);
      const action = isNewUser.length === 0 ? "join" : "login";
      const result = await authService.handleAuthUser(userInfo, action);
      const userRole = await userService.getUserRoleByGroupId({
        groupId: result.user.groups[0],
        userId: result.user._id,
      });
      //const userRole = userGroups.map( (group) => group.);
      const token = authService.generateJWT(
        result.user._id,
        result.user.nickname,
      );
      console.log("result: ", result);
      console.log("role: ", userRole);
      res.cookie("service_token", token, { path: "/", httpOnly: true });
      res.redirect(
        `${process.env.FRONTEND_URL}/login?id=${result.user._id}&nickname=${result.user.nickname}&profile=${result.user.profileImgUrl}&group=${result.user.groups[0]}&role=${userRole}`,
      );
    },
  ),
  handleLogin: asyncHandler(async (req: express.Request, res: Response) => {
    const snsId = req.body.snsId;
    const result = await userService.signIn(snsId);
    if (!result) {
      throw new CustomError({
        status: 404,
        message: "존재하지 않는 id입니다.",
      });
    }

    // if (result.deletedAt !== null) {
    //   await userService.revertDeletedUser(snsId);
    // }

    res.status(200).json({
      message: "로그인에 성공했습니다.",
      user: result,
    });
  }),
  handleJoin: asyncHandler(async (req: express.Request, res: Response) => {
    const { snsId, nickname, profileImgUrl } = req.body;
    const newUser = await userService.signUp(snsId, nickname, profileImgUrl);
    if (!newUser) {
      throw new CustomError({
        status: 400,
        message: "회원 가입에 실패했습니다.",
      });
    }

    const newGroup = await groupService.addGroup({
      groupId: newUser.snsId,
      userId: newUser._id as unknown as string,
      nickname: newUser.nickname,
    });

    if (newGroup) {
      newUser.groups.push(newGroup._id);
      await newUser.save();
    }

    res.status(201).json({
      message: "회원 가입에 성공했습니다.",
      user: newUser,
    });
  }),
  handleLogout: asyncHandler(async (req: express.Request, res: Response) => {
    res.clearCookie("service_token", { path: "/", maxAge: 0 });
    res.status(204).send();
  }),
  handleWithdraw: asyncHandler(async (req: express.Request, res: Response) => {
    const userToken = req.cookies.service_token;
    const userId = authService.extractDataFromToken(userToken, "user_id");
    const result = await userService.withdrawUser(userId);
    if (!result) {
      throw new CustomError({
        status: 400,
        message: "회원 탈퇴에 실패했습니다.",
      });
    }
    res.clearCookie("service_token", { path: "/", maxAge: 0 });
    res.status(200).json({
      message: "회원 탈퇴에 성공했습니다.",
      user: result,
    });
  }),
};

export default authController;
