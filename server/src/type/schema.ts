import { Types } from "mongoose";

export type UserSchemaType = {
  _id: Types.ObjectId;
  nickname: string;
  snsId: string;
  profileImgUrl: string;
  group: Array<Types.ObjectId>;
};

export type expenseSchemaType = {
  _id: Types.ObjectId;
  amounts: number;
  businessName: string;
  date: Date;
  category?: string; //TODO: Types.ObjectId 로 변경
  owner: string; //TODO: Types.ObjectId 로 변경
  isRecurring: string;
};
