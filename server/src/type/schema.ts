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
  date: string;
  category?: Types.ObjectId;
  owner: Types.ObjectId;
  isRecurring: boolean;
};
