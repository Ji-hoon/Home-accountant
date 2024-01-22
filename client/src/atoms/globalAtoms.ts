import { atom } from "recoil";
import { dialogType } from "../global/customType";

export const isLoginAtom = atom({
  key: "isLogin",
  default: false,
});

export const currentUserAtom = atom({
  key: "currentUser",
  default: {
    userId: "",
    nickname: "",
  },
});

export const currentDialogAtom = atom<dialogType>({
  key: "currentDialog",
  default: {
    isOpen: false, // false : CLOSED | true : OPENED
    content: [], // 배열 길이만큼 다이얼로그를 생성한다. (중첩 가능)
  },
});

export const currentDateAtom = atom({
  key: "currentDate",
  default: new Date(),
});

export const dateUnitAtom = atom({
  key: "dateUnit",
  default: "WEEK",
});

export const calendarOpenAtom = atom({
  key: "calendarOpen",
  default: false,
});
