import styled from "styled-components";
import { COLORS, SIZES } from "../../global/constants";
import { InputFormType, dialogLayoutType } from "../../global/customType";
import { useForm } from "react-hook-form";

export default function Textfield({
  title,
  fieldName,
  type,
  placeholder,
  defaultValue,
  options,
}: dialogLayoutType) {
  const { register } = useForm<InputFormType>();
  //console.log(fieldName, watch(fieldName));
  return (
    <TextFieldLayout>
      <label>{title}</label>
      {type !== "selectbox" && (
        <input
          {...register(fieldName, { required: true })}
          name={fieldName}
          type={type}
          placeholder={placeholder}
          defaultValue={defaultValue}
        />
      )}
      {type === "selectbox" && (
        <select
          {...register(fieldName, { required: true })}
          defaultValue={defaultValue}
        >
          <option disabled>{defaultValue}</option>
          {options &&
            options.length > 0 &&
            options.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
        </select>
      )}
      {/* {errors.fieldName && <span>This field is required</span>} */}
    </TextFieldLayout>
  );
}

const TextFieldLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${SIZES.SM / 2}px;
  text-align: left;

  & label {
    font-weight: bold;
    font-size: ${SIZES.SM}px;
    line-height: ${SIZES.LG}px;
  }

  & input,
  & select {
    padding: ${SIZES.LG / 2}px ${SIZES.XL / 2}px;
    background-color: ${COLORS.GRAY_01};
    border: none;
    border-radius: 5px;
    outline: none;
    font-size: ${SIZES.SM}px;
    line-height: ${SIZES.LG}px;

    -webkit-transition: all 200ms ease-out;
    transition: all 200ms ease-out;

    &:focus {
      background-color: ${COLORS.GRAY_01_OVERAY};
    }
  }
`;
