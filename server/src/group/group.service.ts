import groupModel from "./group.model.js";
import { GroupCreateType } from "../type/global.js";
import { CustomError } from "../middleware/errorHandler.js";
import UserModel from "../user/user.model.js";

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
      members: {
        userId: userId,
        role: "OWNER",
        _id: null,
      },
    };

    const newGroup = await groupModel.create(groupData);

    return newGroup;
  },
  async getGroup(id: string) {
    const groupInfo = await groupModel.findById(id);

    if (!groupInfo) {
      return null;
    }

    const memberList = groupInfo?.members || [];
    const memberInfo = await Promise.all(
      memberList?.map(async (member) => {
        const user = await UserModel.findById(member.userId);
        console.log(user);
        return {
          memberId: user?._id,
          nickname: user?.nickname,
          profileImgUrl: user?.profileImgUrl,
          role: member.role,
        };
      }),
    );

    return {
      id: groupInfo._id,
      name: groupInfo.name,
      members: memberList.length === 0 ? [] : memberInfo,
    };
  },
};

export default groupService;
