import { GroupCreateType } from "../type/global.js";
import { CustomError } from "../middleware/errorHandler.js";
import UserModel from "../user/user.model.js";
import GroupModel from "./group.model.js";

const groupService = {
  async addGroup({ groupId, userId, nickname }: GroupCreateType) {
    const existGroup = await GroupModel.findOne({
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

    const newGroup = await GroupModel.create(groupData);

    return newGroup;
  },
  async getGroup(id: string) {
    const groupInfo = await GroupModel.findById(id);

    if (!groupInfo) {
      return null;
    }

    const memberList = groupInfo?.members || [];
    const memberInfo = await Promise.all(
      memberList?.map(async (member) => {
        const user = await UserModel.findById(member.userId);
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
      code: groupInfo.code,
      name: groupInfo.name,
      members: memberList.length === 0 ? [] : memberInfo,
    };
  },
  async updateGroup(id: string, name: string) {
    const group = await GroupModel.findOneAndUpdate(
      { _id: id },
      {
        name,
      },
      { new: true },
    );
    return group;
  },
};

export default groupService;
