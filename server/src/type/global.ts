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
