import styled from "styled-components";
import { COLORS, SIZES, LABELS, TYPES } from "../../global/constants";
import { InputFormType, FormListLayoutType } from "../../global/customType";
import { useForm } from "react-hook-form";
import { format } from "date-fns";

import { DayClickEventHandler } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useState, useEffect, memo } from "react";
import { useEmailInput } from "../hooks/useEmailInput";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  currentUserAtom,
  emailListAtom,
  modalIndexAtom,
} from "../../atoms/globalAtoms";
import { FiX } from "react-icons/fi";
import Button_Icontype from "./Button.iconType";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useDropdown } from "../hooks/useDropdown";
import Dropdown from "../dropdown/Dropdown";
import Dropdown_Calendar from "../dropdown/Dropdown.Calendar";
import { useHandleDialog } from "../hooks/useHandleDialog";
import {
  addExpenseCategoryLayout,
  addAssetTypeLayout,
} from "../../global/layout";
import Selectbox from "./Selectbox";
import { useGroups } from "../../pages/Main/subpages/Group/Group.hooks";

function Textfield({
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
  //const [calendarOpen, setCalendarOpen] = useState(false);
  const { register } = useForm<InputFormType>();

  const { handleEmail, handleRemoveEmail, handleLinkCopy } = useEmailInput();
  const emailList = useRecoilValue(emailListAtom);

  const currentUser = useRecoilValue(currentUserAtom);
  const { data } = useGroups(currentUser.currentGroup);
  const groupInfo = data.data?.groupInfo;
  const { code } = groupInfo;
  const invitationUrl = `${import.meta.env.VITE_FRONTEND_URL}/invite?code=${code}`;

  const {
    targetRef,
    showDropdown,
    targetPosition,
    handleDropdownTrigger,
    showDropdownUniqueKey,
  } = useDropdown({
    dropdownType: TYPES.DROPDOWN_KEY_CALENDAR_DATE_FIELD,
    dropdownId: selectedDay ? format(selectedDay, "yyyy_MM_dd") : "",
  });

  const { showDialog } = useHandleDialog();
  const [modalIndex, setModalIndex] = useRecoilState(modalIndexAtom);

  const handleDayClick: DayClickEventHandler = (day) => {
    setSelectedDay(day);
    //setCalendarOpen(!calendarOpen);
  };

  function handleTextInput(e: React.KeyboardEvent) {
    const target = e.target as HTMLInputElement;

    if (target.type === "email" && e.code === "Comma") {
      handleEmail(target);
    }
  }

  function handleDirtyFields(event: React.ChangeEvent) {
    const target = event.target as HTMLFormElement;
    if (target.value !== "" || !target.value.includes("..")) {
      target.classList.remove("error");
    }
  }

  useEffect(() => {
    if (defaultDate !== undefined) setSelectedDay(defaultDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TextFieldLayout hidden={hidden} ref={targetRef}>
      <label>
        {title}
        {fieldName === "invitationLink" && (
          <CopyToClipboard text={invitationUrl} onCopy={handleLinkCopy}>
            <a href="#">{LABELS.LABEL_COPY_INVITE_LINK}</a>
          </CopyToClipboard>
        )}
        {fieldName === "category" && (
          <a
            href="#"
            onClick={() => {
              if (modalIndex >= 0) {
                const newIndex = modalIndex + 1;
                setModalIndex(newIndex);
              }

              showDialog({
                type: TYPES.MODAL_SINGLE_COL,
                title: LABELS.LABEL_ADD_EXPENSE_CATRGORY,
                layout: addExpenseCategoryLayout as FormListLayoutType[],
              });
            }}
          >
            {LABELS.LABEL_ADD_EXPENSE_CATRGORY}
          </a>
        )}
        {fieldName === "assetType" && (
          <a
            href="#"
            onClick={() => {
              if (modalIndex >= 0) {
                const newIndex = modalIndex + 1;
                setModalIndex(newIndex);
                console.log(newIndex);
              }

              showDialog({
                type: TYPES.MODAL_SINGLE_COL,
                title: LABELS.LABEL_ADD_ASSET_TYPE,
                layout: addAssetTypeLayout as FormListLayoutType[],
              });
            }}
          >
            {LABELS.LABEL_ADD_ASSET_TYPE}
          </a>
        )}
      </label>
      {(type === "text" || type === "number" || type === "email") && (
        <input
          {...register(fieldName, { required: true })}
          onChange={(event: React.ChangeEvent) => handleDirtyFields(event)}
          name={fieldName}
          type={type}
          placeholder={placeholder}
          defaultValue={
            fieldName === "invitationLink" ? invitationUrl : defaultValue
          }
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
        <Selectbox
          fieldName={fieldName}
          placeholder={placeholder}
          defaultValue={defaultValue}
          options={options}
          readonly={readonly}
          onChange={(event: React.ChangeEvent) => handleDirtyFields(event)}
        />
      )}
      {type === "date" && (
        <input
          className={showDropdown === showDropdownUniqueKey ? "active" : ""}
          {...register(fieldName, { required: true })}
          name={fieldName}
          type={type}
          readOnly={true}
          placeholder={placeholder}
          id={selectedDay as unknown as string}
          value={format(selectedDay, "yyyy-MM-dd")}
          onClick={(event: React.SyntheticEvent) => {
            event.preventDefault();
            handleDropdownTrigger();
          }}
          onFocus={(event: React.FocusEvent) =>
            (event.target as HTMLInputElement).blur()
          }
        />
      )}
      {type === "date" && showDropdown === showDropdownUniqueKey && (
        <div className="calendar-container">
          <Dropdown>
            <Dropdown_Calendar
              $currentDate={selectedDay}
              $clickHandler={handleDayClick}
              data={targetPosition}
              direction={TYPES.DIRECTION_UP}
            />
          </Dropdown>
        </div>
      )}
      {/* {errors.fieldName && <span>This field is required</span>} */}
    </TextFieldLayout>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export default memo(Textfield);

export const TextFieldLayout = styled.div<{
  hidden: boolean | undefined;
}>`
  display: flex;
  flex-direction: column;
  gap: ${SIZES.SM / 2}px;
  text-align: left;

  position: ${(props) => (props.hidden !== undefined ? "absolute" : "static")};
  visibility: ${(props) => (props.hidden !== undefined ? "hidden" : "visible")};
  height: ${(props) => (props.hidden !== undefined ? "0px" : "auto")};

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
    border: 1px solid transparent;
    border-radius: 5px;
    outline: none;
    font-size: ${SIZES.SM}px;
    line-height: ${SIZES.LG}px;

    -webkit-transition: all 200ms ease-out;
    transition: all 200ms ease-out;

    -webkit-appearance: none;
    appearance: auto;
    text-align: left;

    &:not([readonly]):focus,
    &.active {
      background-color: ${COLORS.GRAY_01_OVERAY};
    }
    &:disabled {
      cursor: not-allowed;
    }
    &[readonly][type="text"] {
      color: ${COLORS.GRAY_03};
      cursor: auto;
    }
    &.error::placeholder {
      color: ${COLORS.VARIATION_RED};
    }
  }

  & select {
    margin-right: 10px;
    box-shadow: 10px 0 0 0 ${COLORS.GRAY_01};

    &:focus {
      box-shadow: 10px 0 0 0 ${COLORS.GRAY_01_OVERAY};
    }
    &.error {
      color: ${COLORS.VARIATION_RED};
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
