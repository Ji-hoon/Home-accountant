import { addMonths, addWeeks, subMonths, subWeeks } from "date-fns";
import { currentDateAtom } from "../../atoms/globalAtoms";
import { useRecoilState } from "recoil";

export function useHandleDate() {
  const [currentDate, setCurrentDate] = useRecoilState(currentDateAtom);

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
  return { addMonth, subMonth, addWeek, subWeek };
}
