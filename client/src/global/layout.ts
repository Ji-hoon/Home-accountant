export const CreateExpenseLayout = [
  {
    title: "지출 금액 (원)",
    fieldName: "amounts",
    type: "number",
    placeholder: "지출 금액을 입력해주세요.",
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
    options: ["만두", "밀크티"],
  },
  {
    title: "지출 날짜 (YYYY-MM-DD)",
    fieldName: "date",
    type: "text",
    placeholder: "지출 날짜를 입력해주세요.",
  },
  {
    title: "정기 지출 여부",
    fieldName: "isRecurring",
    type: "selectbox",
    placeholder: "정기 지출 여부를 선택해주세요..",
    defaultValue: "",
    options: ["일시불", "정기 결제"],
  },
];
