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
};

export type InputFormType = {
  amounts?: string | undefined;
  category?: string | undefined;
  businessName?: string | undefined;
  owner?: string | undefined;
  date?: string | undefined;
  isRecurring?: string | undefined;
};

export type ResultType = {
  result: {
    id: string;
    nickname: string;
    profile: string;
  };
};
