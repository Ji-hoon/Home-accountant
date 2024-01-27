import styled from "styled-components";
import { COLORS, SIZES } from "../../global/constants";
import { InputFormType, dialogLayoutType } from "../../global/customType";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import Calendar from "../util/Calendar";

import { DayClickEventHandler } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useState } from "react";

export default function Textfield({
  title,
  fieldName,
  type,
  placeholder,
  defaultValue,
  options,
  readonly,
  hidden,
}: dialogLayoutType) {
  const [selectedDay, setSelectedDay] = useState<Date>(new Date());
  const [calendarOpen, setCalendarOpen] = useState(false);
  const { register } = useForm<InputFormType>();

  const handleDayClick: DayClickEventHandler = (day) => {
    setSelectedDay(day);
    setCalendarOpen(!calendarOpen);
  };

  return (
    <TextFieldLayout hidden={hidden}>
      <label>{title}</label>
      {(type === "text" || type === "number") && (
        <input
          {...register(fieldName, { required: true })}
          name={fieldName}
          type={type}
          placeholder={placeholder}
          defaultValue={defaultValue}
          disabled={readonly}
        />
      )}
      {type === "selectbox" && (
        <select
          {...register(fieldName, { required: true })}
          defaultValue={placeholder !== "" ? placeholder : defaultValue}
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
          value={
            defaultValue === ""
              ? format(selectedDay, "yyyy-MM-dd")
              : format(defaultValue as unknown as Date, "yyyy-MM-dd")
          }
          onClick={() => setCalendarOpen(!calendarOpen)}
        />
      )}
      {type === "date" && calendarOpen && (
        <div className="calendar-container">
          <Calendar $currentDate={selectedDay} $clickHandler={handleDayClick} />
        </div>
      )}
      {/* {errors.fieldName && <span>This field is required</span>} */}
    </TextFieldLayout>
  );
}

const TextFieldLayout = styled.div<{
  hidden: boolean | undefined;
}>`
  display: flex;
  flex-direction: column;
  gap: ${SIZES.SM / 2}px;
  text-align: left;

  position: ${(props) => (props.hidden !== undefined ? "absolute" : "static")};
  visibility: ${(props) => (props.hidden !== undefined ? "hidden" : "visible")};
  height: ${(props) => (props.hidden !== undefined ? "0px" : "auto")};
  pointer-events: ${(props) => (props.hidden !== undefined ? "none" : "auto")};

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
    &:disabled {
      cursor: not-allowed;
    }
  }

  & select {
    margin-right: 10px;
    box-shadow: 10px 0 0 0 ${COLORS.GRAY_01};

    &:focus {
      box-shadow: 10px 0 0 0 ${COLORS.GRAY_01_OVERAY};
    }
  }

  & .calendar-container {
    position: absolute;
    margin: 0 !important;
    top: -${SIZES.SM / 2}px;
    left: ${SIZES.XL}px;
    z-index: 1;

    @media screen and (max-width: ${SIZES.MEDIA_QUERY_BP_LARGE}px) {
      position: absolute;
      top: 160px;
    }
  }
`;
