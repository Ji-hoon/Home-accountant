export type UserType = {
  nickname: string;
  profileImgUrl: string;
};

export type ExpenseType = {
  amounts: number;
  businessName: string;
  date: Date;
  category?: string;
  owner: string;
  isRecurring: boolean;
};

export type AssetType = {
  amounts: number;
  name: string;
  assetType: string; //TODO: Types.ObjectId로 변경 필요
  owner: string; //TODO: Types.ObjectId 로 변경 필요
  assetHistory: {
    date: string | Date; //api 요청만 string으로 받고, data 저장 시에는 date로 parsing 해서 저장.
    amounts: number;
    _id: null;
  }[];
};

export type AssetUpdateType = {
  amounts: number;
  name: string;
  owner: string;
  assetId: string;
  assetType: string;
  assetDate: Date | string;
};
