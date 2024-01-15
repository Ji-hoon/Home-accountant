import UserModel from "./user.model.js";
// import {
//   generateNickname,
//   generateRandomProfile,
// } from "../utils/randomizeContent.js";

type UserType = {
  nickname: string;
  profileImgUrl: string;
};

const userService = {
  async getUser(_id: string) {
    return UserModel.findOne({ _id });
  },

  /** nickname 기준으로 탐색 */
  async getUsersByQuery(props: {
    query: string;
    cursor: number;
    limit: number;
  }) {
    const { query, cursor, limit } = props;

    return UserModel.find({ nickname: { $regex: new RegExp(query, "i") } })
      .skip(cursor)
      .limit(limit)
      .sort({ createdAt: -1 });
  },

  async updateUser(_id: string, { nickname, profileImgUrl }: UserType) {
    return UserModel.findOneAndUpdate({ _id }, { nickname, profileImgUrl });
  },

  async findUserWithSnsId(snsId: string) {
    return await UserModel.find({ snsId: snsId });
  },

  async signUp(snsId: string, nickname: string, profileImgUrl: string) {
    const user = {
      snsId,
      nickname,
      profileImgUrl,
    };

    console.log("user: ", user);

    //if (!user.nickname) user.nickname = "만두";
    // user.profileImgUrl = generateRandomProfile();

    return await UserModel.create(user);
  },
  async signIn(snsId: string) {
    return await UserModel.findOne({ snsId: snsId });
  },
  async withdrawUser(userId: string) {
    return await UserModel.findOneAndUpdate(
      { _id: userId },
      { deletedAt: new Date() },
      { new: true },
    );
  },
  async revertDeletedUser(snsId: string) {
    return await UserModel.findOneAndUpdate(
      { snsId: snsId },
      { deletedAt: null },
      { new: true },
    );
  },
};

export default userService;
