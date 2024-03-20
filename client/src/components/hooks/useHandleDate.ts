import {
  addMonths,
  addWeeks,
  addYears,
  subMonths,
  subWeeks,
  subYears,
} from "date-fns";
import { calendarOpenAtom, currentDateAtom } from "../../atoms/globalAtoms";
import { useRecoilState } from "recoil";
import { DayClickEventHandler } from "react-day-picker";

export function useHandleDate() {
  const [currentDate, setCurrentDate] = useRecoilState(currentDateAtom);
  const [calendarOpen, setCalendarOpen] = useRecoilState(calendarOpenAtom);

  function addYear() {
    const newDate = addYears(currentDate, 1);
    setCurrentDate(newDate);
  }

  function subYear() {
    const newDate = subYears(currentDate, 1);
    setCurrentDate(newDate);
  }

  function addMonth() {
    const newDate = addMonths(currentDate, 1);
    setCurrentDate(newDate);
  }

  function subMonth() {
    const newDate = subMonths(currentDate, 1);
    setCurrentDate(newDate);
  }
  function addWeek() {
    const newDate = addWeeks(currentDate, 1);
    setCurrentDate(newDate);
  }
  function subWeek() {
    const newDate = subWeeks(currentDate, 1);
    setCurrentDate(newDate);
  }
  const handleDayClick: DayClickEventHandler = (day) => {
    setCurrentDate(day);
    setCalendarOpen(!calendarOpen);
  };
  return {
    addYear,
    subYear,
    addMonth,
    subMonth,
    addWeek,
    subWeek,
    handleDayClick,
    calendarOpen,
    setCalendarOpen,
  };
}
