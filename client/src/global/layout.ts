import { ChartData } from "../pages/Main/subpages/Assets/Chart/Assets.Chart.hooks";
import { VALUES } from "./constants";
import { ExpenseType, FormListLayoutType, groupInfoType } from "./customType";

export const CreateExpenseLayout = [
  {
    title: "지출 금액 (원)",
    fieldName: "amounts",
    type: "number",
    placeholder: "숫자만 입력해주세요.",
  },
  {
    title: "카테고리",
    fieldName: "category",
    type: "selectbox",
    placeholder: "카테고리를 선택해주세요..",
    defaultValue: "",
  },
  {
    title: "상호명",
    fieldName: "businessName",
    type: "text",
    placeholder: "상호명을 입력해주세요.",
  },
  {
    title: "멤버",
    fieldName: "owner",
    type: "selectbox",
    placeholder: "멤버를 선택해주세요..",
    defaultValue: "",
  },
  {
    title: "지출 날짜",
    fieldName: "date",
    type: "date",
    placeholder: "지출 날짜를 입력해주세요.",
  },
  {
    title: "정기 지출 여부",
    fieldName: "isRecurring",
    type: "selectbox",
    placeholder: "",
    defaultValue: "일시불",
    options: ["일시불"], //TODO: 추후 구현 ["할부", "정기 결제"],
  },
];

export const CreateAssetLayout = ({ assetTypes }: { assetTypes: string[] }) => {
  return [
    {
      title: "자산 금액 (원)",
      fieldName: "amounts",
      type: "number",
      placeholder: "숫자만 입력해주세요.",
    },
    {
      title: "자산 타입",
      fieldName: "assetType",
      type: "selectbox",
      placeholder: "자산 타입을 선택해주세요..",
      defaultValue: "",
      options: assetTypes, //TODO: API 받아온걸로 적용되면 삭제 ["현금", "주식", "보험금", "비트코인", "부동산"],
    },
    {
      title: "자산 이름",
      fieldName: "name",
      type: "text",
      placeholder: "자산 이름을 입력해주세요.",
    },
    {
      title: "멤버",
      fieldName: "owner",
      type: "selectbox",
      placeholder: "멤버를 선택해주세요..",
      defaultValue: "",
    },
  ];
};

export const EditAssetLayout = ({
  owner,
  name,
  amounts,
  data,
  assetTypes,
  members,
}: {
  owner: string;
  name: string;
  amounts: number;
  data: ChartData;
  assetTypes: string[];
  members: string[];
}) => {
  const assetName = name.split(" (")[0];
  const assetType = name.split(" (")[1].replace(")", "");
  const assetId = Object.keys(data)
    .filter((key) => {
      return typeof data[key] === "string";
    })
    .filter((key) => {
      if (key.includes(assetType) && key.includes("id")) return data[key];
    });
  const assetDate = Object.keys(data)
    .filter((key) => {
      return typeof data[key] === "string";
    })
    .filter((key) => {
      if (key.includes(assetType) && key.includes("date")) return data[key];
    });
  //console.log(assetId, assetDate);

  return [
    {
      title: "자산 금액 (원)",
      fieldName: "amounts",
      type: "number",
      placeholder: "숫자만 입력해주세요.",
      defaultValue: amounts * VALUES.ASSET_AMOUNTS_UNIT,
      readonly: false,
    },
    {
      title: "자산 타입",
      fieldName: "assetType",
      type: "selectbox",
      placeholder: "",
      options: assetTypes, //TODO: API 적용되면 삭제 필요 ["현금", "주식", "보험금", "비트코인", "부동산"],
      defaultValue: assetType,
      readonly: true,
    },
    {
      title: "자산 이름",
      fieldName: "name",
      type: "text",
      placeholder: "자산 이름을 입력해주세요.",
      defaultValue: assetName,
      readonly: false,
    },
    {
      title: "멤버",
      fieldName: "owner",
      type: "selectbox",
      placeholder: "",
      options: members, //TODO: API 받아온걸로 적용되면 삭제 ["훈", "밀크티"],
      defaultValue: owner,
      readonly: true,
    },
    {
      title: "자산 id",
      fieldName: "assets_id",
      type: "text",
      placeholder: "",
      defaultValue: data[assetId[0]],
      readonly: true,
      hidden: true,
    },
    {
      title: "자산 date",
      fieldName: "assets_date",
      type: "text",
      placeholder: "",
      defaultValue: data[assetDate[0]],
      readonly: true,
      hidden: true,
    },
  ];
};

export const EditExpenseLayout = ({
  item,
}: {
  item: ExpenseType & {
    _id: string;
  };
}) => {
  return [
    {
      title: "지출 금액 (원)",
      fieldName: "amounts",
      type: "number",
      placeholder: "숫자만 입력해주세요.",
      defaultValue: item.amounts,
    },
    {
      title: "카테고리",
      fieldName: "category",
      type: "selectbox",
      placeholder: "",
      defaultValue: item.category,
    },
    {
      title: "상호명",
      fieldName: "businessName",
      type: "text",
      placeholder: "상호명을 입력해주세요.",
      defaultValue: item.businessName,
    },
    {
      title: "멤버",
      fieldName: "owner",
      type: "selectbox",
      placeholder: "",
      defaultValue: item.owner,
    },
    {
      title: "지출 날짜",
      fieldName: "date",
      type: "date",
      defaultDate: new Date(item.date), //NOTE: ISO 8601 형식의 문자열을 Date 타입으로 전환
    },
    {
      title: "정기 지출 여부",
      fieldName: "isRecurring",
      type: "selectbox",
      placeholder: "",
      defaultValue: item.isRecurring,
      options: ["일시불"], //TODO: 추후 구현 ["할부", "정기 결제"],
    },
    {
      title: "지출 내역 id",
      fieldName: "expense_id",
      type: "text",
      placeholder: "",
      defaultValue: item._id,
      readonly: true,
      hidden: true,
    },
  ];
};

export const GroupSettingLayout = ({
  id,
  code,
  name,
  members,
}: groupInfoType): FormListLayoutType[] => {
  return [
    {
      title: "그룹명",
      fieldName: "groupName",
      type: "text",
      placeholder: "그룹명을 입력해주세요.",
      defaultValue: name,
    },
    {
      title: "초대링크",
      fieldName: "invitationLink",
      type: "text",
      placeholder: "",
      defaultValue: `${import.meta.env.VITE_FRONTEND_URL}/invite?code=${code}`,
      readonly: true,
    },
    {
      title: "그룹 id",
      fieldName: "groupId",
      type: "text",
      placeholder: "",
      defaultValue: id,
      readonly: true,
    },
    {
      title: "멤버 수",
      fieldName: "groupMembers",
      type: "text",
      placeholder: "",
      defaultValue: String(members.length),
      readonly: true,
    },
  ];
};

export const InviteMemberLayout = (code: string): FormListLayoutType[] => {
  return [
    {
      title: "이메일 주소",
      fieldName: "email",
      type: "email",
      placeholder: "이메일 주소를 입력해주세요.",
    },
    {
      title: "초대링크",
      fieldName: "invitationLink",
      type: "text",
      placeholder: "",
      defaultValue: `${import.meta.env.VITE_FRONTEND_URL}/invite?code=${code}`,
      readonly: true,
    },
  ];
};

export const addExpenseCategoryLayout = [
  {
    title: "카테고리명",
    fieldName: "newCategory",
    type: "text",
    placeholder: "카테고리명을 입력해주세요.",
  },
];

export const addAssetTypeLayout = [
  {
    title: "자산 타입",
    fieldName: "newAssetType",
    type: "text",
    placeholder: "자산 타입을 입력해주세요.",
  },
];
