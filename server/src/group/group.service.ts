import { GroupCreateType } from "../type/global.js";
import { CustomError } from "../middleware/errorHandler.js";
import UserModel from "../user/user.model.js";
import GroupModel from "./group.model.js";
import { Types } from "mongoose";
const ObjectId = Types.ObjectId;
import { createTransport } from "nodemailer";
import "dotenv/config";
import { renderMustacheTemplate } from "../utils/renderMustacheTemplate.js";
import CategoryModel from "../categories/categories.model.js";

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
        userId: new ObjectId(userId as string),
        role: "OWNER",
        joinedAt: new Date(),
        _id: null,
      },
    };

    const newGroup = await GroupModel.create(groupData);

    return newGroup;
  },
  async addMemberToGroup({
    groupId,
    userId,
  }: Omit<GroupCreateType, "nickname">) {
    const existGroup = await GroupModel.findOne({
      _id: groupId,
    });

    if (!existGroup) {
      //TODO: controller로 에러 처리 이관 필요
      throw new CustomError({
        status: 400,
        message: "그룹이 존재하지 않습니다.",
      });
    }

    const existUser = await GroupModel.aggregate([
      { $match: { _id: new ObjectId(groupId) } },
      { $unwind: { path: "$members", preserveNullAndEmptyArrays: true } },
      { $match: { "members.userId": new ObjectId(userId) } },
    ]);
    console.log(existUser);

    if (existUser.length > 0) {
      throw new CustomError({
        status: 405,
        message: "이미 가입된 멤버입니다.",
      });
    }

    const newMember = {
      userId: new ObjectId(userId as string),
      joinedAt: new Date(),
      role: "MEMBER",
      _id: null,
    };
    existGroup.members.push(newMember);
    await existGroup.save();

    const user = await UserModel.findById(userId);

    if (user) {
      user.groups.push(new ObjectId(groupId as string));
      await user.save();
    }

    return newMember;
  },
  async inviteMemberToGroup({
    name,
    code,
    email,
  }: {
    name: string;
    code: string;
    email: string;
  }) {
    const transporter = createTransport({
      service: "Gmail",
      auth: {
        user: process.env.MAILER_NAME,
        pass: process.env.MAILER_PASSWORD,
      },
    });
    const inviteUrl = `${process.env.FRONTEND_URL}/invite?code=${code}`;

    const template = await renderMustacheTemplate({
      filePath: "invitation",
      data: {
        name: name,
        inviteUrl: inviteUrl,
      },
    });

    const mailOptions = {
      from: process.env.MAILER_NAME,
      to: email,
      subject: "[가계부를 부탁해] 💌 초대장이 도착했어요!",
      html: template,
    };

    // 메일 전송
    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        throw new CustomError({
          status: 400,
          message: "메일 발송에 실패했습니다.",
        });
      }
    });

    return { message: "메일이 성공적으로 전송되었습니다." };
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
          userId: user?._id,
          nickname: user?.nickname,
          profileImgUrl: user?.profileImgUrl,
          role: member.role,
          joinedAt: member.joinedAt,
        };
      }),
    );

    const categoriesList = await CategoryModel.find({
      groupId: groupInfo._id,
    });

    return {
      id: groupInfo._id,
      code: groupInfo.code,
      name: groupInfo.name,
      members: memberList.length === 0 ? [] : memberInfo,
      categories: categoriesList.length === 0 ? [] : categoriesList,
    };
  },
  async getGroupByCode(code: string) {
    const group = await GroupModel.findOne({ code }, { name: 1, members: 1 });
    return group;
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
