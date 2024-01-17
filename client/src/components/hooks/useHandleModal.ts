import { useRecoilState } from "recoil";
import { currentDialogAtom } from "../../atoms/globalAtoms";

export function useHandleModal() {
  const [modal, setModal] = useRecoilState(currentDialogAtom);

  function showModal({
    type,
    content,
  }: {
    type: "MODAL" | "POPUP";
    content: string;
  }) {
    const newModal = {
      isOpen: !modal.isOpen,
      content: [...modal.content, { type, title: content }],
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
