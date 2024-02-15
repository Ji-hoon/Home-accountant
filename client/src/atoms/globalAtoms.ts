import { atom } from "recoil";
import { dialogType, stringArrayType } from "../global/customType";

export const isLoginAtom = atom({
  key: "isLogin",
  default: false,
});

export const currentUserAtom = atom({
  key: "currentUser",
  default: {
    userId: "",
    nickname: "",
    currentGroup: "",
    currentRole: "",
    profile: "",
  },
});

export const currentOwnerAtom = atom({
  key: "currentOwner",
  default: "",
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

export const dropdownOpenAtom = atom({
  key: "dropdownOpen",
  default: "",
});

export const selectedExpenseIdAtom = atom<stringArrayType>({
  key: "selectedExpense",
  default: [],
});

export const emailListAtom = atom<stringArrayType>({
  key: "emailList",
  default: [],
});

export const prevPathAtom = atom({
  key: "prevPath",
  default: "",
});

export const modalIndexAtom = atom({
  key: "modalIndex",
  default: 0,
});
