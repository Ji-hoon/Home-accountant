import { useForm } from "react-hook-form";
import {
  FormListLayoutType,
  InputFormType,
  categoryType,
  memberType,
  AssetTypeType,
} from "../../global/customType";
import { TYPES } from "../../global/constants";
import { currentUserAtom } from "../../atoms/globalAtoms";
import { useRecoilValue } from "recoil";
import { useGroups } from "../../pages/Main/subpages/Group/Group.hooks";
import { useExpenseCategory } from "../hooks/useExpenseCategory";
import { covertToStringArray } from "../../util/handleCovertArray";
import { useAssetType } from "../hooks/useAssetType";
import ApiBoundary from "../common/ApiBoundary";

// eslint-disable-next-line react-refresh/only-export-components
export default function Selectbox(
  props: Omit<
    FormListLayoutType,
    "title" | "type" | "defaultDate" | "hidden"
  > & {
    onChange: (event: React.ChangeEvent) => void;
  },
) {
  return (
    <ApiBoundary>
      <ApiComponent {...props} />
    </ApiBoundary>
  );
}

export function ApiComponent({
  fieldName,
  placeholder,
  defaultValue,
  readonly,
  options,
  onChange,
}: Omit<FormListLayoutType, "title" | "type" | "defaultDate" | "hidden"> & {
  onChange: (event: React.ChangeEvent) => void;
}) {
  const currentUser = useRecoilValue(currentUserAtom);

  const { register } = useForm<InputFormType>();
  const { members } = useGroups(currentUser.currentGroup);
  const { categories } = useExpenseCategory();
  const { assetTypes } = useAssetType();

  let optionLists = options;
  if (fieldName === "category")
    optionLists = covertToStringArray(categories as categoryType[], "name");
  else if (fieldName === "owner")
    optionLists = covertToStringArray(members as memberType[], "nickname");
  else if (fieldName === "assetType")
    optionLists = covertToStringArray(
      assetTypes as AssetTypeType[],
      "assetType",
    );

  return (
    <select
      {...register(fieldName, { required: true })}
      defaultValue={
        placeholder !== ""
          ? placeholder
          : optionLists
              ?.map((option) => {
                if (option.split("_")[0] === defaultValue) {
                  return option.split("_")[1];
                }
              })
              .find((value) => value)
      }
      disabled={readonly}
      onChange={onChange}
    >
      {placeholder !== "" && (
        <option disabled value={placeholder}>
          {placeholder}
        </option>
      )}
      {optionLists &&
        optionLists.length > 0 &&
        optionLists.map((item, index) => (
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
