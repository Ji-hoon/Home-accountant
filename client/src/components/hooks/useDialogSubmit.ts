import { useExpenses } from "../../pages/Main/subpages/Expenses/Expenses.hooks";
import { useAssets } from "../../pages/Main/subpages/Assets/Assets.hooks";
import { useGroups } from "../../pages/Main/subpages/Group/Group.hooks";
import { useExpenseCategory } from "../hooks/useExpenseCategory";
import { useAssetType } from "../hooks/useAssetType";
import { format, parse } from "date-fns";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  currentDateAtom,
  currentDialogAtom,
  dateUnitAtom,
  emailListAtom,
  modalIndexAtom,
  selectedExpenseIdAtom,
} from "../../atoms/globalAtoms";
import { useHandleDialog } from "./useHandleDialog";
import { useRef } from "react";
import {
  AssetType,
  AssetUpdateType,
  ExpenseType,
} from "../../global/customType";
import { LABELS } from "../../global/constants";

export function useDialogSubmit() {
  const currentDate = useRecoilValue(currentDateAtom);
  const dateUnit = useRecoilValue(dateUnitAtom);
  const currentUser = localStorage.getItem("currentUser");
  const currentGroupId = currentUser && JSON.parse(currentUser).currentGroup;
  const modalIndex = useRecoilValue(modalIndexAtom);
  const dialog = useRecoilValue(currentDialogAtom);
  const [emailList, setEmailList] = useRecoilState(emailListAtom);
  const selectedExpenseId = useRecoilValue(selectedExpenseIdAtom);

  const { getDialogFormData, hideDialog } = useHandleDialog();
  const { addExpense, updateExpense, deleteExpense } = useExpenses();
  const { addAsset, updateAsset } = useAssets({
    owner: "",
    currentDate,
    unit: dateUnit,
    currentGroupId,
  });
  const { updateGroup, inviteMemberToGroup } = useGroups(currentGroupId);
  const { addExpenseCategory } = useExpenseCategory();
  const { addAssetType } = useAssetType();

  const dialogRef = useRef<HTMLDivElement>(null);

  async function onSubmit() {
    const contentLength = dialog.content.length;
    if (dialogRef.current && contentLength > 0) {
      const modalContainer =
        dialogRef.current.getElementsByClassName("modal-container");
      const lastFormRef =
        modalContainer[modalIndex].getElementsByTagName("form")[0];
      const currentFormData = getDialogFormData(lastFormRef);
      console.log("submit!", modalIndex, currentFormData);

      if (selectedExpenseId.length > 0) {
        const result = await submitDialog({
          action: dialog.content[modalIndex].title,
          data: selectedExpenseId,
        });
        if (result?.status === 204) {
          hideDialog({ order: modalIndex });
        }
        return;
      }

      if (emailList.length > 0 || currentFormData.email) {
        //console.log(emailList);
        if (currentFormData.email) {
          const newEmail = [...emailList, currentFormData.email];
          setEmailList(() => newEmail);
        }

        const result = await submitDialog({
          action: dialog.content[modalIndex].title,
          data: emailList,
        });
        if (result?.status === 201 || result?.status === 200)
          hideDialog({ order: modalIndex });
        return;
      }

      const result = await submitDialog({
        action: dialog.content[modalIndex].title,
        data: currentFormData,
      });
      if (result?.status === 201 || result?.status === 200)
        hideDialog({ order: modalIndex });
    }
  }

  async function submitDialog({
    action,
    data,
  }: {
    action: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: ExpenseType | AssetType | AssetUpdateType | any; //TODO: submit으로 들어오는 타입들 추가하기
  }) {
    console.log({ action, data });
    if (action === LABELS.LABEL_ADD_EXPENSE) {
      const result = await addExpense({
        amounts: data.amounts,
        category: data.category,
        businessName: data.businessName,
        owner: data.owner,
        currentGroupId,
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
        currentGroupId,
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
      const result = await deleteExpense();
      console.log(result);
      if (result.length > 0) return result[0];
    }

    if (action === LABELS.LABEL_UPDATE_GROUP_INFO) {
      const result = await updateGroup({
        id: currentGroupId,
        name: data.groupName,
      });
      if (result) return result;
    }

    if (action === LABELS.LABEL_INVITE_MEMBER) {
      const result = await inviteMemberToGroup();
      if (result && result.length > 0) return result[0];
    }

    if (action === LABELS.LABEL_ADD_EXPENSE_CATRGORY) {
      const result = await addExpenseCategory({
        groupId: currentGroupId,
        category: data.newCategory,
      });
      if (result) return result;
    }

    if (action === LABELS.LABEL_ADD_ASSET_TYPE) {
      const result = await addAssetType({
        groupId: currentGroupId,
        assetType: data.newAssetType,
      });
      if (result) return result;
    }
  }

  return { dialogRef, onSubmit, submitDialog };
}
