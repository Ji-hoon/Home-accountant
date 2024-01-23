import { useExpenses } from "../Expenses/Expenses.hooks";

export default function Expenses_Amounts({
  $currentDate,
  $unit,
  $owner,
}: {
  $currentDate: Date;
  $unit: string;
  $owner: string;
}) {
  const { pages } = useExpenses({
    owner: $owner,
    currentDate: $currentDate,
    unit: $unit,
  });
  const amounts = pages[0]?.amounts;

  return <>{amounts.toLocaleString()}원</>;
}
