import { useRecoilState } from "recoil";
import { emailListAtom } from "../../atoms/globalAtoms";

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

  return { handleEmail, handleRemoveEmail };
}
