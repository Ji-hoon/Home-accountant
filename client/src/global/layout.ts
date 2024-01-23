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
    options: ["식비", "문화생활"],
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
    options: ["훈", "밀크티"], // TODO: 일단 닉네임으로 조회, 추후 userId(ObjectId)로 변경
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
    options: ["일시불", "할부", "정기 결제"],
  },
];

export const CreateAssetLayout = [
  {
    title: "자산 금액 (원)",
    fieldName: "amounts",
    type: "number",
    placeholder: "숫자만 입력해주세요.",
  },
  {
    title: "자산 이름",
    fieldName: "name",
    type: "text",
    placeholder: "자산 이름을 입력해주세요.",
  },
  {
    title: "자산 타입",
    fieldName: "assetType",
    type: "selectbox",
    placeholder: "자산 타입을 선택해주세요..",
    defaultValue: "",
    options: ["현금", "주식", "비트코인", "부동산"],
  },
  {
    title: "멤버",
    fieldName: "owner",
    type: "selectbox",
    placeholder: "멤버를 선택해주세요..",
    defaultValue: "",
    options: ["훈", "밀크티"], // TODO: 일단 닉네임으로 조회, 추후 userId(ObjectId)로 변경
  },
];
