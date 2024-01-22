import { ko } from "date-fns/locale";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import styled from "styled-components";
import { COLORS, SIZES } from "../../global/constants";
import { DayClickEventHandler } from "react-day-picker";

export default function Calendar({
  $currentDate,
  $clickHandler,
}: {
  $currentDate: Date;
  $clickHandler: DayClickEventHandler;
}) {
  return (
    <CalendarContainer>
      <DayPicker
        locale={ko}
        mode="single"
        selected={$currentDate}
        onDayClick={$clickHandler}
        footer={<></>}
      />
    </CalendarContainer>
  );
}

const CalendarContainer = styled.div`
  & .rdp {
    position: absolute;
    margin: 0 !important;
    padding: 1em;

    font-size: ${SIZES.SM}px;
    font-weight: 500;
    background-color: #fff;
    /* width: calc(50% - 36px); */
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
