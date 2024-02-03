import styled from "styled-components";

import { SIZES, COLORS, PATH, TYPES, LABELS } from "../../global/constants";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import Button_Icontype from "../basic/Button.iconType";
import { useHandleDate } from "../hooks/useHandleDate";
import { addDays, startOfWeek, format, isSameMonth } from "date-fns";
import Button_Boxtype from "../basic/Button.boxType";
import Assets_Amounts from "../../pages/Main/subpages/Assets/Assets.amounts";
import Expenses_Amounts from "../../pages/Main/subpages/Expenses/Expenses.amounts";
import { useLocation } from "react-router";
import { useDropdown } from "../hooks/useDropdown";
import Dropdown from "../dropdown/Dropdown";
import Dropdown_Calendar from "../dropdown/Dropdown.Calendar";

export default function ListHeader({
  $currentDate,
  $unit,
  $type,
  $owner,
  $member,
}: {
  $currentDate?: Date;
  $unit?: string;
  $type?: string;
  $owner?: string;
  $member?: number;
}) {
  //console.log("header: ", $currentDate);
  const {
    addYear,
    subYear,
    addMonth,
    subMonth,
    addWeek,
    subWeek,
    handleDayClick,
  } = useHandleDate();

  const {
    targetRef,
    showDropdown,
    targetPosition,
    handleDropdownTrigger,
    showDropdownUniqueKey,
  } = useDropdown({
    dropdownType: TYPES.DROPDOWN_KEY_CALENDAR_LIST_HEADER,
    dropdownId: $currentDate ? format($currentDate, "yyyy_MM_dd") : "",
  });

  const location = useLocation();

  const startDay = startOfWeek(
    $currentDate !== undefined ? $currentDate : new Date(),
    { weekStartsOn: 1 },
  );
  const getEndDay = addDays(startDay, 6);

  return (
    <>
      {$currentDate !== undefined &&
        $unit !== undefined &&
        $type !== undefined &&
        $owner !== undefined && (
          <ListHeaderContainer $type={$type} ref={targetRef}>
            <div className="header-navigation-container">
              <Button_Icontype
                onClick={() => {
                  if ($unit === TYPES.TYPE_UNIT_MONTH) subMonth();
                  else if ($unit === TYPES.TYPE_UNIT_WEEK) subWeek();
                  else if ($unit === TYPES.TYPE_UNIT_YEAR) subYear();
                }}
              >
                <FiChevronLeft strokeWidth="3" />
              </Button_Icontype>
              <Button_Boxtype
                type={showDropdown === showDropdownUniqueKey ? "active" : ""}
                onClick={handleDropdownTrigger}
              >
                <>
                  {$unit === TYPES.TYPE_UNIT_WEEK &&
                    `${format(startDay, `M월 d일`)} ~ ${format(getEndDay, `${isSameMonth(startDay, getEndDay) ? "" : `M월`} d일`)}`}
                  {$unit === TYPES.TYPE_UNIT_MONTH &&
                    format($currentDate, "yyyy년 M월")}
                  {$unit === TYPES.TYPE_UNIT_YEAR &&
                    format($currentDate, "yyyy년")}
                </>
              </Button_Boxtype>
              <Button_Icontype
                onClick={() => {
                  if ($unit === TYPES.TYPE_UNIT_MONTH) addMonth();
                  else if ($unit === TYPES.TYPE_UNIT_WEEK) addWeek();
                  else if ($unit === TYPES.TYPE_UNIT_YEAR) addYear();
                }}
              >
                <FiChevronRight strokeWidth="3" />
              </Button_Icontype>
            </div>
            <div className="header-value-container">
              {location.pathname.includes(PATH.MAIN_EXPENSES) && (
                <Expenses_Amounts
                  $currentDate={$currentDate}
                  $unit={$unit}
                  $owner={$owner}
                />
              )}
              {location.pathname.includes(PATH.MAIN_ASSETS) && (
                <Assets_Amounts
                  $currentDate={$currentDate}
                  $unit={$unit}
                  $owner={$owner}
                />
              )}
            </div>
            {showDropdown === showDropdownUniqueKey && (
              <Dropdown>
                <Dropdown_Calendar
                  $currentDate={$currentDate}
                  $clickHandler={handleDayClick}
                  data={targetPosition}
                  direction={TYPES.DIRECTION_DOWN}
                />
              </Dropdown>
            )}
          </ListHeaderContainer>
        )}
      {$type === TYPES.MEMBER && (
        <ListHeaderContainer $type={$type}>
          <h3>
            {LABELS.NAVIGATION_MENU_GROUP_MEMBER} (
            {$member !== undefined ? $member : 0})
          </h3>
        </ListHeaderContainer>
      )}
      {$type === TYPES.GROUP && (
        <ListHeaderContainer $type={$type}>
          <h3>{LABELS.NAVIGATION_MENU_GROUP_SETTINGS}</h3>
        </ListHeaderContainer>
      )}
    </>
  );
}

const ListHeaderContainer = styled.div<{
  $type: string;
}>`
  display: flex;
  justify-content: space-between;
  position: sticky;
  top: 80px;
  align-items: center;
  z-index: 1;

  padding: ${SIZES.XS * 2}px ${SIZES.SM}px ${SIZES.XS}px ${SIZES.XXS}px;
  background-color: ${COLORS.BASIC_WHITE};

  font-size: ${SIZES.XL}px;
  line-height: ${SIZES.XXL}px;
  font-weight: bold;

  & .header-navigation-container {
    display: flex;
    align-items: center;
    margin-left: -${SIZES.XS / 2}px;

    & button {
      padding: ${SIZES.LG / 2}px;
      font-size: inherit;

      &:not(:hover):not(:active):not(.active) {
        background-color: transparent;
      }

      &:hover {
      }
    }
  }

  & .header-value-container {
    color: ${(props) =>
      props.$type === "EXPENSES" ? COLORS.VARIATION_RED : COLORS.BRAND_DEEP};
  }

  & .header-calendar-container {
    position: absolute;
    top: ${SIZES.XXL * 2 + 4}px;
    left: 0;
  }

  & h3 {
    margin: 0;
    font-size: inherit;
    line-height: ${SIZES.XXL}px;
    padding: 2px ${SIZES.XXS}px;
  }
`;
