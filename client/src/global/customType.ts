export type dialogType = {
  isOpen: boolean;
  content:
    | {
        type: "MODAL_DOUBLE_COLUMN" | "MODAL_SINGLE_COLUMN" | "POPUP";
        title: string; // 타이틀 텍스트
        layout:
          | Array<{
              title: string;
              fieldName: string;
              type: string;
              placeholder: string;
              default?: undefined | string;
              options?: undefined | string[];
            }>
          | [];
      }[]
    | [];
};

export type ResultType = {
  result: {
    id: string;
    nickname: string;
    profile: string;
  };
};
