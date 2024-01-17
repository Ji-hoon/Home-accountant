export type modalType = {
  isOpen: boolean;
  content:
    | {
        type: "MODAL_DOUBLE_COLUMN" | "MODAL_SINGLE_COLUMN" | "POPUP";
        title: string; // 타이틀 텍스트
        layout:
          | Array<{
              title: string;
              type: string;
              placeholder: string;
              default?: undefined | string;
            }>
          | [];
      }[]
    | [];
};
