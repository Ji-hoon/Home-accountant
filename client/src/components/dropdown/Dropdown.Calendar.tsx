import styled from "styled-components";

import { DropdownProps } from "../../global/customType";
import { COLORS, SIZES } from "../../global/constants";
import Calendar from "../common/Calendar";
import { DayClickEventHandler } from "react-day-picker";

export default function Dropdown_Calendar({
  data,
  $currentDate,
  $clickHandler,
}: {
  data: DropdownProps["data"];
  $currentDate: Date;
  $clickHandler: DayClickEventHandler;
}) {
  return (
    <DropdownCalendarContainer data={data}>
      <Calendar $currentDate={$currentDate} $clickHandler={$clickHandler} />
    </DropdownCalendarContainer>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
const DropdownCalendarContainer = styled.div<{
  data: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}>`
  position: absolute;
  left: ${(props) => props.data.x}px;
  top: ${(props) => props.data.y + props.data.height}px;

  margin-top: 6px;
  margin-left: -40px;
  background-color: #fff;
  border-radius: 5px;
  background-color: ${COLORS.BASIC_WHITE};
  box-shadow: 0 2px 7px 0 ${COLORS.GRAY_07_OVERAY};
  max-width: ${SIZES.MAX_WIDTH * 0.65}px;
`;
