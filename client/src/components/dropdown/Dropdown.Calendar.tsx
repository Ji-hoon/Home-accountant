import styled from "styled-components";

import { DropdownProps } from "../../global/customType";
import { SIZES, TYPES } from "../../global/constants";
import Calendar from "../common/Calendar";
import { DayClickEventHandler } from "react-day-picker";
import { DropdownUIContainerStyle } from "./Dropdown";
import { useEffect, useRef, useState } from "react";

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
  const ismobile = /iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent);
  const calendarRef = useRef<HTMLDivElement>(null);
  const [calendarHeight, setCalendarHeight] = useState<number | null>(null);

  useEffect(() => {
    if (calendarRef?.current) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      const calendarHeight = calendarRef.current
        .getElementsByClassName("rdp")[0]
        .getBoundingClientRect().height;
      console.log(calendarHeight);
      setCalendarHeight(calendarHeight);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calendarRef?.current?.getElementsByClassName("rdp")[0]]);

  return (
    <DropdownCalendarUIContainer
      data={data}
      direction={direction}
      ismobile={ismobile}
      ref={calendarRef}
      $innerheight={calendarHeight}
      className={ismobile ? "mobile" : ""}
    >
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
  ismobile?: boolean;
  $innerheight?: number | null;
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

  @media screen and (max-width: ${SIZES.MEDIA_QUERY_BP_SMALL}px) {
    &.mobile {
      height: ${(props) => props.$innerheight && props.$innerheight}px;

      .rdp {
        width: 100%;
        border-radius: 5px 5px 0 0;
      }
      .rdp-day {
        height: calc(100vw / 7 - 5px);
        width: calc(100vw / 7 - 5px);
        max-width: calc(100vw / 7 - 5px);
      }
    }
  }
`;
