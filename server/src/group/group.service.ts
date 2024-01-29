import groupModel from "./group.model.js";
import { GroupCreateType } from "../type/global.js";
import { CustomError } from "../middleware/errorHandler.js";

const groupService = {
  async addGroup({ groupId, userId, nickname }: GroupCreateType) {
    const existGroup = await groupModel.findOne({
      code: groupId,
    });

    if (existGroup) {
      //TODO: controller로 에러 처리 이관 필요
      throw new CustomError({
        status: 400,
        message: "이미 그룹이 존재합니다.",
      });
    }

    const groupData = {
      name: `${nickname}님의 가계부`,
      code: groupId,
      member: {
        userId: userId,
        role: "OWNER",
        _id: null,
      },
    };

    const newGroup = await groupModel.create(groupData);

    return newGroup;
  },
};

export default groupService;
