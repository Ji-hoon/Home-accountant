import { useRecoilState } from "recoil";
import { LABELS, TYPES } from "../../global/constants";
import { FormListLayoutType } from "../../global/customType";
import { addExpenseCategoryLayout } from "../../global/layout";
import { useHandleDialog } from "./useHandleDialog";
import { modalIndexAtom } from "../../atoms/globalAtoms";

export function useExpenseCategory() {
  const { showDialog } = useHandleDialog();
  const [modalIndex, setModalIndex] = useRecoilState(modalIndexAtom);

  function addCategory() {
    console.log("카테고리 추가");
    if (modalIndex >= 0) {
      const newIndex = modalIndex + 1;
      setModalIndex(newIndex);
      console.log(newIndex);
    }

    showDialog({
      type: TYPES.MODAL_SINGLE_COL,
      title: LABELS.LABEL_ADD_EXPENSE_CATRGORY,
      layout: addExpenseCategoryLayout as FormListLayoutType[],
    });
  }

  return { addCategory };
}
