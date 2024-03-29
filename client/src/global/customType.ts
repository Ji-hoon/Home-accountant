import { ChartData } from "../pages/Main/subpages/Assets/Chart/Assets.Chart.hooks";

export type dialogType = {
  isOpen: boolean;
  content:
    | {
        type: "MODAL_DOUBLE_COLUMN" | "MODAL_SINGLE_COLUMN" | "POPUP";
        title: string; // 타이틀 텍스트
        layout: Array<FormListLayoutType> | popupLayoutType | [];
      }[]
    | [];
};

export type FormListLayoutType = {
  title: string;
  fieldName:
    | "amounts"
    | "category"
    | "businessName"
    | "owner"
    | "date"
    | "isRecurring"
    | "assetType"
    | "assets_id"
    | "assets_date"
    | "expense_id"
    | "groupName"
    | "groupId"
    | "groupMembers"
    | "email"
    | "invitationLink";
  type: string;
  placeholder?: string;
  defaultValue?: string;
  defaultDate?: Date;
  options?: undefined | string[];
  readonly?: boolean;
  hidden?: boolean;
  data?: ChartData;
};

export type popupLayoutType = {
  description: string;
};

export type InputFormType = {
  amounts?: string | undefined;
  category?: string | undefined;
  businessName?: string | undefined;
  owner?: string | undefined;
  date?: string | undefined;
  isRecurring?: string | undefined;
  groupName?: string | undefined;
  groupId?: string | undefined;
  groupMembers?: string | undefined;
  invitationLink?: string | undefined;
  assetType?: string | undefined;
  assets_id?: string | undefined;
  assets_date?: string | undefined;
  expense_id?: string | undefined;
  email?: string | undefined;
  newCategory?: string | undefined;
};

export type ExpenseType = {
  amounts: string;
  category: string;
  businessName: string;
  owner: string;
  currentGroupId: string;
  date: Date;
  isRecurring: string;
};

export type AssetType = {
  amounts: string;
  name: string;
  owner: string;
  currentGroupId: string;
  assetType: string;
  assetHistory: {
    date: Date | string;
    amounts: number;
  };
};
export type AssetTypeType = {
  _id: string;
  name: string;
};

export type AssetUpdateType = {
  amounts: string;
  name: string;
  owner: string;
  assetId: string;
  assetType: string;
  assetDate: Date | string;
};

export type loginUserType = {
  result: currentUserType;
};

export type currentUserType = {
  userId: string;
  nickname: string;
  profile: string;
  currentGroup: string;
  currentRole: string;
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

export type stringArrayType = string[];

export type memberType = {
  userId: string;
  nickname: string;
  profileImgUrl: string;
  role: string;
  joinedAt: Date;
};

export type groupMemberType = {
  userId: string;
  role: string;
  joinedAt: Date;
};

export type groupInfoType = {
  id: string;
  code: string;
  name: string;
  members: memberType[] | [] | groupMemberType[];
};

export type groupListInfoType = groupInfoType & {
  createdAt: Date;
  updatedAt: Date;
  _id: string;
};

export type PortalProps = {
  children?: React.ReactNode;
};

export type DropdownProps = {
  data: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
};

export type categoryType = {
  _id: string;
  name: string;
  groupId: string;
  status: string;
  type: string;
};

// export type formLayoutOptionArrayType = {
//   optionId: string;
//   value: string;
// }
