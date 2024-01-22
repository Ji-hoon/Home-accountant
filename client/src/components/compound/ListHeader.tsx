import styled from "styled-components";

import { SIZES, COLORS } from "../../global/constants";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import Button_Icontype from "../basic/Button.iconType";
import { useExpenses } from "../../pages/Main/subpages/Expenses/Expenses.hooks";
import { useHandleDate } from "../hooks/useHandleDate";
import { addDays, startOfWeek, format, isSameMonth } from "date-fns";
import Button_Boxtype from "../basic/Button.boxType";
import Calendar from "../util/Calendar";

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
    addMonth,
    subMonth,
    addWeek,
    subWeek,
    calendarOpen,
    setCalendarOpen,
    handleDayClick,
  } = useHandleDate();
  const { pages } = useExpenses({
    owner: $owner,
    currentDate: $currentDate,
    unit: $unit,
  });
  const amounts = pages[0]?.amounts;

  const startDay = startOfWeek($currentDate, { weekStartsOn: 1 });
  const getEndDay = addDays(startDay, 6);

  return (
    <ListHeaderContainer $type={$type} $data={amounts}>
      <div className="header-navigation-container">
        <Button_Icontype
          onClick={() => {
            $unit === "WEEK" ? subWeek() : subMonth();
          }}
        >
          <FiChevronLeft strokeWidth="3" />
        </Button_Icontype>
        <Button_Boxtype onClick={() => setCalendarOpen(!calendarOpen)}>
          <>
            {$unit === "WEEK" &&
              `${format(startDay, `M월 d일`)} ~ ${format(getEndDay, `${isSameMonth(startDay, getEndDay) ? "" : `M월`} d일`)}`}
            {$unit !== "WEEK" && format($currentDate, "yyyy년 M월")}
          </>
        </Button_Boxtype>
        <Button_Icontype
          onClick={() => {
            $unit === "WEEK" ? addWeek() : addMonth();
          }}
        >
          <FiChevronRight strokeWidth="3" />
        </Button_Icontype>
      </div>
      <div className="header-value-container">{amounts.toLocaleString()}원</div>
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
  $data: number;
}>`
  display: flex;
  justify-content: space-between;
  position: sticky;
  top: 80px;
  align-items: center;

  padding: ${SIZES.XS * 2}px ${SIZES.SM}px ${SIZES.XS}px;
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
    color: ${COLORS.BRAND_DEEP};

    &:before {
      content: ${(props) =>
        props.$type === "EXPENSES" && props.$data !== 0 ? '"-"' : '""'};
    }
  }

  & .header-calendar-container {
    position: absolute;
    top: ${SIZES.XXL * 2 + 4}px;
    left: 0;
  }
`;
