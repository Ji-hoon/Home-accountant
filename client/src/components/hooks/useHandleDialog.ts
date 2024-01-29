import { useRecoilState, useRecoilValue } from "recoil";
import {
  currentDateAtom,
  currentDialogAtom,
  dateUnitAtom,
} from "../../atoms/globalAtoms";
import {
  ExpenseType,
  AssetType,
  AssetUpdateType,
  FormListLayoutType,
  popupLayoutType,
} from "../../global/customType";
import { useExpenses } from "../../pages/Main/subpages/Expenses/Expenses.hooks";
import { LABELS } from "../../global/constants";
import { format, parse } from "date-fns";
import { useAssets } from "../../pages/Main/subpages/Assets/Assets.hooks";
import { useGroups } from "../../pages/Main/subpages/Group/Group.hooks";

export function useHandleDialog() {
  const currentDate = useRecoilValue(currentDateAtom);
  const dateUnit = useRecoilValue(dateUnitAtom);
  const [dialog, setDialog] = useRecoilState(currentDialogAtom);
  const currentUser = localStorage.getItem("currentUser");
  const currentGroupId = currentUser && JSON.parse(currentUser).currentGroup;

  //console.log("dialog: ",currentDate);
  const { addExpense, updateExpense, deleteExpense } = useExpenses({
    owner: "",
    currentDate,
    unit: dateUnit,
  });
  const { addAsset, updateAsset } = useAssets({
    owner: "",
    currentDate,
    unit: dateUnit,
  });
  const { updateGroup } = useGroups(currentGroupId);

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
    data: ExpenseType | AssetType | AssetUpdateType | any; //TODO: submit으로 들어오는 타입들 추가하기
  }) {
    if (action === LABELS.LABEL_ADD_EXPENSE) {
      const result = await addExpense({
        amounts: data.amounts,
        category: data.category,
        businessName: data.businessName,
        owner: data.owner,
        date: parse(data.date, "yyyy-MM-dd", new Date()),
        isRecurring: data.isRecurring,
      });
      if (result) return result;
    }

    if (action === LABELS.LABEL_ADD_ASSET) {
      const result = await addAsset({
        amounts: data.amounts,
        name: data.name,
        owner: data.owner,
        assetType: data.assetType,
        assetHistory: {
          date: format(new Date(), "yyyy-MM-dd"),
          amounts: data.amounts,
        },
      });
      if (result) return result;
    }

    if (action === LABELS.LABEL_EDIT_ASSET) {
      const result = await updateAsset({
        amounts: data.amounts,
        name: data.name,
        owner: data.owner,
        assetType: data.assetType,
        assetId: data.assets_id,
        assetDate: data.assets_date,
      });
      if (result) return result;
    }

    if (action === LABELS.LABEL_EDIT_EXPENSE) {
      const result = await updateExpense({
        expenseId: data.expense_id,
        amounts: data.amounts,
        category: data.category,
        businessName: data.businessName,
        owner: data.owner,
        date: parse(data.date, "yyyy-MM-dd", new Date()),
        isRecurring: data.isRecurring,
      });
      if (result) return result;
    }

    if (action === LABELS.LABEL_DELETE_EXPENSE) {
      const result = await deleteExpense({
        expenseId: data[0],
      });
      if (result) return result;
    }

    if (action === LABELS.LABEL_UPDATE_GROUP_INFO) {
      const result = await updateGroup({
        id: currentGroupId,
        name: data.groupName,
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
