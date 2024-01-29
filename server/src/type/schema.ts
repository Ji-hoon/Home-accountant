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
  category?: string; //TODO: Types.ObjectId 로 변경
  owner: string; //TODO: Types.ObjectId 로 변경
  isRecurring: string;
};

export type assetSchemaType = {
  _id: Types.ObjectId;
  amounts: number;
  name: string;
  assetType: string; //TODO: Types.ObjectId로 변경 필요
  owner: string; //TODO: Types.ObjectId 로 변경 필요
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
    role: string;
  }>;
  code: string;
};
