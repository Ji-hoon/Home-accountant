import { useRecoilState } from "recoil";
import { currentDialogAtom } from "../../atoms/globalAtoms";

export function useHandleDialog() {
  const [dialog, setDialog] = useRecoilState(currentDialogAtom);

  function showDialog({
    type,
    title,
    layout,
  }: {
    type: "MODAL_DOUBLE_COLUMN" | "MODAL_SINGLE_COLUMN" | "POPUP";
    title: string;
    layout: Array<{
      title: string;
      fieldName: string;
      type: string;
      placeholder: string;
      default?: undefined | string;
      options?: string[];
    }>;
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

  function submitDialog() {}

  return { showDialog, hideDialog, submitDialog };
}