import toast from "react-hot-toast";
import { useRecoilValue } from "recoil";
import { emailListAtom } from "../../atoms/globalAtoms";

export function useHandleEmptyFields() {
  const emailList = useRecoilValue(emailListAtom);

  function validateEmptyFields(currentFormData: { [key: string]: string }) {
    const values = Object.values(currentFormData);
    const nullValues = values
      .map((value) => {
        if (value === "") return value;
      })
      .filter((value) => value !== undefined);

    if (nullValues.length !== 0 && emailList.length === 0) {
      toast.error("필드를 모두 입력해주세요.");
    }

    return nullValues;
  }

  function handleEmptyFields(lastFormRef: HTMLFormElement) {
    const emptyFields = [
      ...Array.from(lastFormRef.getElementsByTagName("input")).filter(
        (field) => field.value === "",
      ),
      ...Array.from(lastFormRef.getElementsByTagName("select")).filter(
        (select) => select.value.includes(".."),
      ),
    ];
    emptyFields.forEach((field) => field.classList.add("error"));
    const target = emptyFields[0];
    if (target) target.focus();
  }

  return { handleEmptyFields, validateEmptyFields };
}
