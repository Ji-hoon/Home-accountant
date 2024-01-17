export type modalType = {
  isOpen: boolean;
  content:
    | {
        type: "MODAL" | "POPUP";
        title: string; // 타이틀 텍스트
      }[]
    | [];
};
