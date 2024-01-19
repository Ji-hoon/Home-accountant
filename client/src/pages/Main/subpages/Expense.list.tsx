import ListItem_ExpenseType from "../../../components/compound/ListItem.expenseType";
import { useExpenses } from "./Expenses.hooks";

export default function Expense_List({ $owner }: { $owner: string }) {
  const { data } = useExpenses({ owner: $owner });

  const expenseList = data.expenses;
  return (
    <ul>
      {expenseList &&
        expenseList.length > 0 &&
        expenseList.map((item, index) => (
          <ListItem_ExpenseType key={index} $item={item} />
        ))}
    </ul>
  );
}
