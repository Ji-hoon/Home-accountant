import styled from "styled-components";
import { COLORS, SIZES, LABELS, TYPES } from "../../global/constants";
import { InputFormType, FormListLayoutType } from "../../global/customType";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import Calendar from "../common/Calendar";

import { DayClickEventHandler } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useState, useEffect } from "react";
import { useEmailInput } from "../hooks/useEmailInput";
import { useRecoilValue } from "recoil";
import { emailListAtom, currentUserAtom } from "../../atoms/globalAtoms";
import { FiX } from "react-icons/fi";
import Button_Icontype from "./Button.iconType";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default function Textfield({
  title,
  fieldName,
  type,
  placeholder,
  defaultValue,
  defaultDate,
  options,
  readonly,
  hidden,
}: FormListLayoutType) {
  const [selectedDay, setSelectedDay] = useState<Date>(new Date());
  const [calendarOpen, setCalendarOpen] = useState(false);
  const { register } = useForm<InputFormType>();
  const { handleEmail, handleRemoveEmail, handleLinkCopy } = useEmailInput();
  const emailList = useRecoilValue(emailListAtom);
  const currentUser = useRecoilValue(currentUserAtom);

  const handleDayClick: DayClickEventHandler = (day) => {
    setSelectedDay(day);
    setCalendarOpen(!calendarOpen);
  };

  function handleTextInput(e: React.KeyboardEvent) {
    const target = e.target as HTMLInputElement;

    if (target.type === "email" && e.code === "Comma") {
      handleEmail(target);
    }
  }

  useEffect(() => {
    if (defaultDate !== undefined) setSelectedDay(defaultDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TextFieldLayout hidden={hidden}>
      <label>
        {title}
        {fieldName === "invitationLink" && defaultValue && (
          <CopyToClipboard text={defaultValue} onCopy={handleLinkCopy}>
            <a href="#">{LABELS.LABEL_COPY_INVITE_LINK}</a>
          </CopyToClipboard>
        )}
      </label>
      {(type === "text" || type === "number" || type === "email") && (
        <input
          {...register(fieldName, { required: true })}
          name={fieldName}
          type={type}
          placeholder={placeholder}
          defaultValue={defaultValue}
          readOnly={readonly}
          onKeyDown={(e: React.KeyboardEvent) => handleTextInput(e)}
        />
      )}
      {type === "email" && emailList.length > 0 && (
        <p className="email-list">
          {emailList.map((email, index) => (
            <span id={String(index)} key={index}>
              {email}
              <Button_Icontype
                onClick={(e: React.SyntheticEvent) => {
                  e.preventDefault();
                  handleRemoveEmail(index);
                }}
              >
                <FiX />
              </Button_Icontype>
            </span>
          ))}
        </p>
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
              <option
                key={index}
                value={item}
                disabled={
                  currentUser.currentRole !== TYPES.OWNER &&
                  currentUser.nickname !== item
                    ? true
                    : false
                }
              >
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
          id={selectedDay as unknown as string}
          value={format(selectedDay, "yyyy-MM-dd")}
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
    display: flex;
    justify-content: space-between;
    gap: 4px;

    & a {
      align-self: flex-end;
      color: ${COLORS.BRAND_DEEP};

      &:hover {
        text-decoration: underline;
      }
    }
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

    &:not([readonly]):focus {
      background-color: ${COLORS.GRAY_01_OVERAY};
    }
    &:disabled {
      cursor: not-allowed;
    }
    &[readonly][type="text"] {
      color: ${COLORS.GRAY_03};
      cursor: auto;
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
    padding: 4px 0;
    margin: 0 !important;
    top: -${SIZES.XXL}px;
    left: ${SIZES.XL - 2}px;
    z-index: 1;

    @media screen and (max-width: ${SIZES.MEDIA_QUERY_BP_LARGE}px) {
      position: absolute;
      top: 148px;
    }
  }

  & p.email-list {
    display: flex;
    margin: 0;
    gap: 8px;
    flex-wrap: wrap;

    & span {
      text-align: center;
      font-size: ${SIZES.SM}px;
      line-height: ${SIZES.LG}px;
      font-weight: 500;
      background-color: ${COLORS.GRAY_01_OVERAY};
      color: ${COLORS.GRAY_07};
      padding: 4px 6px 4px 14px;
      border-radius: 20px;
      gap: 4px;
      display: flex;
      align-items: center;

      & button {
        padding: 4px;
        color: inherit;
        border-radius: inherit;
      }
    }
  }
`;
