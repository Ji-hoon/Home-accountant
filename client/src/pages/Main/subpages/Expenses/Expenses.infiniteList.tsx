import { FiAlertTriangle } from "react-icons/fi";
import Empty from "../../../../components/common/Empty";
import ListItem_ExpenseType from "../../../../components/compound/ListItem.expenseType";
import { LABELS, TYPES } from "../../../../global/constants";
import { useExpenses } from "./Expenses.hooks";
import { useHandleDialog } from "../../../../components/hooks/useHandleDialog";
import { EditExpenseLayout } from "../../../../global/layout";
import { ExpenseType, FormListLayoutType } from "../../../../global/customType";

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

  const { showDialog } = useHandleDialog();

  function handleClick(
    event: React.SyntheticEvent,
    item: ExpenseType & {
      _id: string;
    },
  ) {
    event.stopPropagation();
    showDialog({
      type: TYPES.MODAL_DOUBLE_COL, //삭제는 POPUP
      title: LABELS.LABEL_EDIT_EXPENSE,
      layout: EditExpenseLayout({ item }) as FormListLayoutType[],
    });
  }
  return (
    <ul>
      {expenseList.length > 0 &&
        expenseList.map((item, index) => (
          <ListItem_ExpenseType
            onClick={(event: React.SyntheticEvent) => handleClick(event, item)}
            key={index}
            $item={item}
          />
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
