import { useRecoilState } from "recoil";
import { emailListAtom } from "../../atoms/globalAtoms";
import toast from "react-hot-toast";
import { LABELS } from "../../global/constants";

export function useEmailInput() {
  const [emailList, setEmailList] = useRecoilState(emailListAtom);

  function handleEmail(target: HTMLInputElement) {
    const newEmailList = [...emailList, target.value];
    setEmailList(newEmailList);
    target.value = "";
    target.blur();
  }

  function handleRemoveEmail(id: number) {
    const newEmailList = [...emailList];
    newEmailList.splice(id, 1);
    setEmailList(() => newEmailList);
  }

  function handleLinkCopy() {
    console.log("copied");
    toast.success(LABELS.MESSAGE_LINK_COPIED);
  }

  return { handleEmail, handleRemoveEmail, handleLinkCopy };
}
