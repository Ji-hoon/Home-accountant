import { FiAlertTriangle } from "react-icons/fi";
import Empty from "../../../../components/common/Empty";
import ListItem_ExpenseType from "../../../../components/compound/ListItem.expenseType";
import { LABELS } from "../../../../global/constants";
import { useExpenses } from "./Expenses.hooks";

export default function Expenses_List({
  $owner,
  $currentDate,
  $unit,
}: {
  $owner: string;
  $currentDate: Date;
  $unit: string;
}) {
  const { pages, setTarget, hasNextPage } = useExpenses({
    owner: $owner,
    currentDate: $currentDate,
    unit: $unit,
  });
  const expenseList = pages.flatMap((page) => page.expenses);

  return (
    <ul>
      {expenseList.length > 0 &&
        expenseList.map((item, index) => (
          <ListItem_ExpenseType key={index} $item={item} />
        ))}
      {hasNextPage && <div ref={setTarget}>리스트 마지막</div>}
      {expenseList.length === 0 && (
        <Empty
          icon={<FiAlertTriangle />}
          message={LABELS.MESSAGE_NO_EXPENSES}
        />
      )}
    </ul>
  );
}
