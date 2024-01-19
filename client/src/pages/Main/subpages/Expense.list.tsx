import { FiAlertTriangle } from "react-icons/fi";
import Empty from "../../../components/common/Empty";
import ListItem_ExpenseType from "../../../components/compound/ListItem.expenseType";
import { LABELS } from "../../../global/constants";
import { useExpenses } from "./Expenses.hooks";

export default function Expense_List({ $owner }: { $owner: string }) {
  const { pages } = useExpenses({ owner: $owner });
  const expenseList = pages.flatMap((page) => page.expenses);

  return (
    <ul>
      {expenseList.length > 0 &&
        expenseList.map((item, index) => (
          <ListItem_ExpenseType key={index} $item={item} />
        ))}
      {expenseList.length === 0 && (
        <Empty
          icon={<FiAlertTriangle />}
          message={LABELS.MESSAGE_NO_EXPENSES}
        />
      )}
    </ul>
  );
}
