import { useExpenses } from "../Expenses/Expenses.hooks";
import { useRecoilValue } from "recoil";
import { currentUserAtom } from "../../../../atoms/globalAtoms";

export default function Expenses_Amounts({
  $currentDate,
  $unit,
  $owner,
}: {
  $currentDate: Date;
  $unit: string;
  $owner: string;
}) {
  const currentUser = useRecoilValue(currentUserAtom);
  const { pages } = useExpenses({
    owner: $owner,
    currentGroupId: currentUser.currentGroup,
    currentDate: $currentDate,
    unit: $unit,
  });
  const amounts = pages[0]?.amounts;

  return <>{amounts.toLocaleString()}원</>;
}
