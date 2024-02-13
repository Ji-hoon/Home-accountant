import { useForm } from "react-hook-form";
import { FormListLayoutType, InputFormType } from "../../global/customType";
import { TYPES } from "../../global/constants";
import { currentUserAtom } from "../../atoms/globalAtoms";
import { useRecoilValue } from "recoil";

export default function Selectbox({
  fieldName,
  placeholder,
  defaultValue,
  options,
  readonly,
}: Omit<FormListLayoutType, "title" | "type" | "defaultDate" | "hidden">) {
  const currentUser = useRecoilValue(currentUserAtom);

  const { register } = useForm<InputFormType>();

  return (
    <select
      {...register(fieldName, { required: true })}
      defaultValue={
        placeholder !== ""
          ? placeholder
          : options
              ?.map((option) => {
                if (option.split("_")[0] === defaultValue) {
                  return option.split("_")[1];
                }
              })
              .find((value) => value)
      }
      disabled={readonly}
    >
      {placeholder !== "" && (
        <option disabled value={placeholder}>
          {placeholder}
        </option>
      )}
      {options &&
        options.length > 0 &&
        options.map((item, index) => (
          <option
            key={index}
            value={item.split("_")[1]}
            disabled={
              currentUser.currentRole !== TYPES.OWNER &&
              fieldName === "owner" &&
              currentUser.nickname !== item.split("_")[0]
                ? true
                : false
            }
          >
            {item.split("_")[0]}
          </option>
        ))}
    </select>
  );
}
