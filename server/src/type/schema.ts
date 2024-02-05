import { Types } from "mongoose";

export type UserSchemaType = {
  _id: Types.ObjectId;
  nickname: string;
  snsId: string;
  profileImgUrl: string;
  groups: Array<Types.ObjectId>;
};

export type expenseSchemaType = {
  _id: Types.ObjectId;
  amounts: number;
  businessName: string;
  date: Date;
  category: Types.ObjectId;
  owner: Types.ObjectId;
  groupId: Types.ObjectId;
  isRecurring: string;
};

export type categorySchemaType = {
  _id: Types.ObjectId;
  name: string;
  groupId: Types.ObjectId;
  status: string;
  type: string;
};

export type assetSchemaType = {
  _id: Types.ObjectId;
  amounts: number;
  name: string;
  assetType: string; //TODO: Types.ObjectId로 변경 필요
  owner: string; //TODO: Types.ObjectId 로 변경 필요
  groupId: Types.ObjectId;
  assetHistory: Array<{
    date: Date;
    amounts: number;
    _id: null;
  }>;
};

export type groupSchemaType = {
  _id: Types.ObjectId;
  name: string;
  members: Array<{
    userId: Types.ObjectId;
    joinedAt: Date;
    role: string;
    _id: null;
  }>;
  code: string;
};
