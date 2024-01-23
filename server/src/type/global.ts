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
  history: Array<{
    date: Date;
    amounts: number;
  }>;
};
