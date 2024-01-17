import { useRecoilState } from "recoil";
import { currentDialogAtom } from "../../atoms/globalAtoms";

export function useHandleModal() {
  const [modal, setModal] = useRecoilState(currentDialogAtom);

  function showModal({
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
      content: [...modal.content, { type, title, layout }],
    };
    setModal(newModal);
  }

  function hideModal({ order }: { order: number }) {
    const newContent = [...modal.content];
    const newModal = {
      isOpen: !modal.isOpen,
      content: newContent.splice(order, 0),
    };
    setModal(newModal);
  }

  return { showModal, hideModal };
}
