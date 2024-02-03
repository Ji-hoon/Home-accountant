import styled from "styled-components";

import { DropdownProps } from "../../global/customType";
import { TYPES } from "../../global/constants";
import Calendar from "../common/Calendar";
import { DayClickEventHandler } from "react-day-picker";
import { DropdownUIContainerStyle } from "./Dropdown";

export default function Dropdown_Calendar({
  data,
  $currentDate,
  $clickHandler,
  direction,
}: {
  data: DropdownProps["data"];
  $currentDate: Date;
  $clickHandler: DayClickEventHandler;
  direction?: string;
}) {
  return (
    <DropdownCalendarUIContainer data={data} direction={direction}>
      <Calendar $currentDate={$currentDate} $clickHandler={$clickHandler} />
    </DropdownCalendarUIContainer>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
const DropdownCalendarUIContainer = styled(DropdownUIContainerStyle)<{
  data: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  direction?: string;
}>`
  left: ${(props) => props.data.x}px;
  top: ${(props) => props.data.y + props.data.height}px;
  width: auto;
  height: auto;
  overflow: visible;
  margin-top: ${(props) =>
    props.direction === TYPES.DIRECTION_DOWN ? -8 : -364}px;
  margin-left: ${(props) =>
    props.direction === TYPES.DIRECTION_DOWN ? 2 : -2}px;
`;
