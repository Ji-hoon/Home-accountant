import { addMonths, subMonths } from "date-fns";
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
  return { addMonth, subMonth };
}
