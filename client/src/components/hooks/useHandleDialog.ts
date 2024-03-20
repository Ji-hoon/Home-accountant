import { useRecoilState, useSetRecoilState } from "recoil";
import {
  currentDialogAtom,
  emailListAtom,
  modalIndexAtom,
} from "../../atoms/globalAtoms";
import { FormListLayoutType, popupLayoutType } from "../../global/customType";

export function useHandleDialog() {
  const [dialog, setDialog] = useRecoilState(currentDialogAtom);
  const setEmailList = useSetRecoilState(emailListAtom);
  //const currentUser = useRecoilValue(currentUserAtom);

  const setModalIndex = useSetRecoilState(modalIndexAtom);

  console.log("handle dialog");

  function showDialog({
    type,
    title,
    layout,
  }: {
    type: "MODAL_DOUBLE_COLUMN" | "MODAL_SINGLE_COLUMN" | "POPUP";
    title: string;
    layout: FormListLayoutType[] | popupLayoutType;
  }) {
    const newModal = {
      isOpen: true,
      content:
        dialog.content.length > 0
          ? [...dialog.content, { type, title, layout }]
          : [{ type, title, layout }],
    };
    setDialog(newModal);
    // console.log("current index : ", newModal.content.length);
    setModalIndex(
      newModal.content.length > 0 ? newModal.content.length - 1 : 0,
    );
  }

  //NOTE: 모든 다이얼로그를 닫고 싶다면 order:0으로 호출
  function hideDialog({ order }: { order: number }) {
    const newContent = [...dialog.content];

    const newModal = {
      isOpen: order !== 0 ? true : false,
      content: order !== 0 ? newContent.splice(order - 1, 1) : [],
    };
    setDialog(() => newModal);
    // console.log("target index : ", order + 1, newModal.content.length);
    setModalIndex(
      newModal.content.length > 0 ? newModal.content.length - 1 : 0,
    );
    setEmailList([]);
  }

  function getDialogFormData(dialogForm: HTMLFormElement) {
    let formData: { [key: string]: string } = {};
    const formElements: HTMLFormControlsCollection = dialogForm.elements;

    formData = Array.from(formElements).reduce(
      (data, element: Element) => {
        if (
          element instanceof HTMLInputElement ||
          element instanceof HTMLSelectElement
        ) {
          if (element.name) {
            const currentValue = element.value;
            data[element.name] =
              element instanceof HTMLSelectElement &&
              currentValue.includes("..")
                ? ""
                : currentValue;
          }
        }
        return data;
      },
      {} as { [key: string]: string },
    );

    return formData;
  }

  return { showDialog, hideDialog, getDialogFormData };
}
