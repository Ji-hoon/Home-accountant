import "dotenv/config";
import asyncHandler from "../middleware/asyncHandler.js";
import express, { Response } from "express";
import { CustomError } from "../middleware/errorHandler.js";
import groupService from "./group.service.js";
import { GroupCreateType } from "../type/global.js";

const groupController = {
  addGroup: asyncHandler(async (req: express.Request, res: Response) => {
    const requestBody = req.body;
    if (!(requestBody as GroupCreateType)) {
      throw new CustomError({
        status: 400,
        message: "요청 항목이 다릅니다.",
      });
    }
    const result = await groupService.addGroup(requestBody);

    if (!result) {
      throw new CustomError({
        status: 400,
        message: "그룹 생성에 실패했습니다.",
      });
    }
    res.status(201).json({
      message: "그룹 생성에 성공했습니다.",
      group: result,
    });
  }),
  getGroup: asyncHandler(async (req: express.Request, res: Response) => {
    const { id } = req.params;

    const groupInfo = await groupService.getGroup(id);

    if (groupInfo === null) {
      throw new CustomError({
        status: 404,
        message: "그룹을 찾을 수 없습니다.",
      });
    }

    res.status(200).json({
      message: "그룹 조회에 성공했습니다.",
      groupInfo,
    });
  }),
  getGroupByCode: asyncHandler(async (req: express.Request, res: Response) => {
    const { code } = req.query;

    const groupInfo = await groupService.getGroupByCode(code as string);

    if (groupInfo === null) {
      throw new CustomError({
        status: 404,
        message: "그룹을 찾을 수 없습니다.",
      });
    }

    res.status(200).json({
      message: "그룹 조회에 성공했습니다.",
      groupInfo,
    });
  }),
  updateGroup: asyncHandler(async (req: express.Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;

    const groupInfo = await groupService.updateGroup(id, name);

    if (groupInfo === null) {
      throw new CustomError({
        status: 404,
        message: "그룹 업데이트에 실패했습니다.",
      });
    }

    res.status(200).json({
      message: "그룹 정보 수정에 성공했습니다.",
      groupInfo,
    });
  }),
  addMemberToGroup: asyncHandler(
    async (req: express.Request, res: Response) => {
      const { groupId } = req.params;
      const { userId } = req.body;

      const result = await groupService.addMemberToGroup({
        groupId,
        userId,
      });
      res.status(200).json({
        message: "그릅에 가입했습니다.",
        groupId,
        result,
      });
    },
  ),
  inviteMemberToGroup: asyncHandler(
    async (req: express.Request, res: Response) => {
      const { id } = req.params;
      const { email } = req.body;

      const groupInfo = await groupService.getGroup(id);
      if (!groupInfo) {
        throw new CustomError({
          status: 404,
          message: "그룹을 찾을 수 없습니다.",
        });
      }

      const result = await groupService.inviteMemberToGroup({
        name: groupInfo.name,
        code: groupInfo.code,
        email,
      });

      if (result.message)
        res.status(200).json({
          message: result.message,
        });
    },
  ),
};

export default groupController;
