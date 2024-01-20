import { useRecoilState } from "recoil";
import { currentDialogAtom } from "../../atoms/globalAtoms";
import { ExpenseType, dialogLayoutType } from "../../global/customType";
import { useExpenses } from "../../pages/Main/subpages/Expenses/Expenses.hooks";
import { LABELS } from "../../global/constants";

export function useHandleDialog() {
  const [dialog, setDialog] = useRecoilState(currentDialogAtom);
  const { addExpense } = useExpenses({ owner: "" });

  function showDialog({
    type,
    title,
    layout,
  }: {
    type: "MODAL_DOUBLE_COLUMN" | "MODAL_SINGLE_COLUMN" | "POPUP";
    title: string;
    layout: dialogLayoutType[];
  }) {
    const newModal = {
      isOpen: true,
      content: [...dialog.content, { type, title, layout }],
    };
    setDialog(newModal);
  }

  function hideDialog({ order }: { order: number }) {
    const newContent = [...dialog.content];
    const newModal = {
      isOpen: !dialog.isOpen,
      content: newContent.splice(order, 0),
    };
    setDialog(newModal);
  }

  async function submitDialog({
    action,
    data,
  }: {
    action: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: ExpenseType | any; //TODO: submit으로 들어오는 타입들 추가하기
  }) {
    if (action === LABELS.LABEL_ADD_EXPENSE) {
      const result = await addExpense({
        amounts: data.amounts,
        category: data.category,
        businessName: data.businessName,
        owner: data.owner,
        date: data.date,
        isRecurring: data.isRecurring,
      });
      if (result) return result;
    }
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
            data[element.name] = currentValue.includes("..")
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

  return { showDialog, hideDialog, submitDialog, getDialogFormData };
}
