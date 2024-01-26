import styled from "styled-components";

import { SIZES, COLORS, PATH, TYPES } from "../../global/constants";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import Button_Icontype from "../basic/Button.iconType";
import { useHandleDate } from "../hooks/useHandleDate";
import { addDays, startOfWeek, format, isSameMonth } from "date-fns";
import Button_Boxtype from "../basic/Button.boxType";
import Calendar from "../util/Calendar";
import Assets_Amounts from "../../pages/Main/subpages/Assets/Assets.amounts";
import Expenses_Amounts from "../../pages/Main/subpages/Expenses/Expenses.amounts";
import { useLocation } from "react-router";

export default function ListHeader({
  $currentDate,
  $unit,
  $type,
  $owner,
}: {
  $currentDate: Date;
  $unit: string;
  $type: string;
  $owner: string;
}) {
  //console.log("header: ", $currentDate);
  const {
    addYear,
    subYear,
    addMonth,
    subMonth,
    addWeek,
    subWeek,
    calendarOpen,
    setCalendarOpen,
    handleDayClick,
  } = useHandleDate();

  const location = useLocation();

  const startDay = startOfWeek($currentDate, { weekStartsOn: 1 });
  const getEndDay = addDays(startDay, 6);

  return (
    <ListHeaderContainer $type={$type}>
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
        <Button_Boxtype onClick={() => setCalendarOpen(!calendarOpen)}>
          <>
            {$unit === TYPES.TYPE_UNIT_WEEK &&
              `${format(startDay, `M월 d일`)} ~ ${format(getEndDay, `${isSameMonth(startDay, getEndDay) ? "" : `M월`} d일`)}`}
            {$unit === TYPES.TYPE_UNIT_MONTH &&
              format($currentDate, "yyyy년 M월")}
            {$unit === TYPES.TYPE_UNIT_YEAR && format($currentDate, "yyyy년")}
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
      {calendarOpen && (
        <div className="header-calendar-container">
          <Calendar
            $currentDate={$currentDate}
            $clickHandler={handleDayClick}
          />
        </div>
      )}
    </ListHeaderContainer>
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
    gap: ${SIZES.XXS / 4}px;
    align-items: center;
    margin-left: -${SIZES.XS / 2}px;

    & button {
      padding: ${SIZES.LG / 2}px;
      font-size: inherit;

      &:not(:hover):not(:active) {
        background-color: transparent;
      }

      &:hover {
      }
    }
  }

  & .header-value-container {
    color: ${(props) =>
      props.$type === "EXPENSES" ? COLORS.VARIATION_RED : COLORS.BRAND_DEEP};

    &:before {
      content: ${(props) => (props.$type === "EXPENSES" ? '"-"' : '""')};
    }
  }

  & .header-calendar-container {
    position: absolute;
    top: ${SIZES.XXL * 2 + 4}px;
    left: 0;
  }
`;
