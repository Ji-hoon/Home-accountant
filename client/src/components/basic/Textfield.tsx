import styled from "styled-components";
import { COLORS, SIZES } from "../../global/constants";
import { InputFormType, dialogLayoutType } from "../../global/customType";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { DayPicker, DayClickEventHandler } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useState } from "react";

export default function Textfield({
  title,
  fieldName,
  type,
  placeholder,
  defaultValue,
  options,
}: dialogLayoutType) {
  const [selectedDay, setSelectedDay] = useState<Date>(new Date());
  const [calendarOpen, setCalendarOpen] = useState(false);
  const { register } = useForm<InputFormType>();

  const handleDayClick: DayClickEventHandler = (day) => {
    setSelectedDay(day);
    setCalendarOpen(!calendarOpen);
  };

  //console.log(fieldName, watch(fieldName));

  return (
    <TextFieldLayout>
      <label>{title}</label>
      {(type === "text" || type === "number") && (
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
          defaultValue={placeholder !== "" ? placeholder : defaultValue}
        >
          {placeholder !== "" && (
            <option disabled value={placeholder}>
              {placeholder}
            </option>
          )}
          {options &&
            options.length > 0 &&
            options.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
        </select>
      )}
      {type === "date" && (
        <input
          {...register(fieldName, { required: true })}
          name={fieldName}
          type={type}
          readOnly={true}
          placeholder={placeholder}
          value={format(selectedDay, "yyyy-MM-dd")}
          onClick={() => setCalendarOpen(!calendarOpen)}
        />
      )}
      {type === "date" && calendarOpen && (
        <DayPicker
          locale={ko}
          mode="single"
          selected={selectedDay}
          onDayClick={handleDayClick}
          footer={<></>}
        />
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
  position: static;

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

  & select {
    margin-right: 10px;
    box-shadow: 10px 0 0 0 ${COLORS.GRAY_01};

    &:focus {
      box-shadow: 10px 0 0 0 ${COLORS.GRAY_01_OVERAY};
    }
  }

  & .rdp {
    position: fixed;
    margin: 0 !important;
    padding: 1em;
    top: 0;
    background-color: #fff;
    width: calc(50% - 36px);
    left: 24px;
    z-index: 1;
    box-shadow: 0 1px 5px 0 ${COLORS.GRAY_05_OVERAY};
    border-radius: 5px;

    & .rdp-day_selected {
      pointer-events: none;
      background-color: ${COLORS.BRAND_LIGHT};
      color: ${COLORS.BASIC_BLACK};
      font-weight: 700;
    }

    & .rdp-day_today:not(.rdp-day_selected) {
      font-weight: 500;
    }
    & .rdp-button:hover:not([disabled]):not(.rdp-day_selected) {
      background-color: ${COLORS.GRAY_01_OVERAY};
    }
  }
`;
