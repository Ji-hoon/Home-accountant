export type dialogType = {
  isOpen: boolean;
  content:
    | {
        type: "MODAL_DOUBLE_COLUMN" | "MODAL_SINGLE_COLUMN" | "POPUP";
        title: string; // 타이틀 텍스트
        layout: Array<dialogLayoutType> | [];
      }[]
    | [];
};

export type dialogLayoutType = {
  title: string;
  fieldName:
    | "amounts"
    | "category"
    | "businessName"
    | "owner"
    | "date"
    | "isRecurring";
  type: string;
  placeholder: string;
  defaultValue?: undefined | string;
  options?: undefined | string[];
  readonly?: boolean;
};

export type InputFormType = {
  amounts?: string | undefined;
  category?: string | undefined;
  businessName?: string | undefined;
  owner?: string | undefined;
  date?: string | undefined;
  isRecurring?: string | undefined;
};

export type ExpenseType = {
  amounts: string;
  category: string;
  businessName: string;
  owner: string;
  date: Date;
  isRecurring: string;
};

export type AssetType = {
  amounts: string;
  name: string;
  owner: string;
  assetType: string;
  assetHistory: {
    date: Date;
    amounts: number;
  };
};

export type loginUserType = {
  result: {
    id: string;
    nickname: string;
    profile: string;
  };
};

export type expenseQueryType = {
  amounts: number;
  expenses: Array<
    ExpenseType & {
      _id: string;
    }
  >;
  nextCursor: number;
};
