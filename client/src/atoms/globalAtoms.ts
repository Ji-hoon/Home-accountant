import { atom } from "recoil";
import { modalType } from "../global/customType";

export const isLoginAtom = atom({
  key: "isLogin",
  default: false,
});

export const currentDialogAtom = atom<modalType>({
  key: "currentDialog",
  default: {
    isOpen: false, // false : CLOSED | true : OPENED
    content: [], // 배열 길이만큼 다이얼로그를 생성한다. (중첩 가능)
  },
});
