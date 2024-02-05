import { FiAlertTriangle } from "react-icons/fi";
import Empty from "../../../../components/common/Empty";
import ListItem_ExpenseType from "../../../../components/compound/ListItem.expenseType";
import { LABELS, TYPES } from "../../../../global/constants";
import { useExpenses } from "./Expenses.hooks";
import { useHandleDialog } from "../../../../components/hooks/useHandleDialog";
import { EditExpenseLayout } from "../../../../global/layout";
import {
  ExpenseType,
  FormListLayoutType,
  categoryType,
  memberType,
} from "../../../../global/customType";
import { useRecoilValue } from "recoil";
import { currentUserAtom } from "../../../../atoms/globalAtoms";
import Skeleton_ExpenseListItem from "../../../../components/skeleton/Skeleton.expenseListItem";
import { useGroups } from "../Group/Group.hooks";
import { covertToStringArray } from "../../../../util/handleCovertArray";

export default function Expenses_List({
  $owner,
  $currentDate,
  $unit,
}: {
  $owner: string;
  $currentDate: Date;
  $unit: string;
}) {
  const currentUser = useRecoilValue(currentUserAtom);
  const { pages, setTarget, hasNextPage, fetchStatus, isFetchingNextPage } =
    useExpenses({
      owner: $owner,
      currentGroupId: currentUser.currentGroup,
      currentDate: $currentDate,
      unit: $unit,
    });
  const expenseList = pages.flatMap((page) => page.expenses);

  const { showDialog } = useHandleDialog();
  const { members, categories } = useGroups(currentUser.currentGroup);

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
      layout: EditExpenseLayout({
        item,
        categories: covertToStringArray(categories as categoryType[], "name"),
        members: covertToStringArray(members as memberType[], "nickname"),
      }) as FormListLayoutType[],
    });
  }
  return (
    <ul
      className={
        fetchStatus === "fetching" && !isFetchingNextPage ? "fetching" : ""
      }
    >
      {expenseList.length > 0 &&
        expenseList.map((item, index) => (
          <ListItem_ExpenseType
            onClick={(event: React.SyntheticEvent) => handleClick(event, item)}
            key={index}
            $item={item}
          />
        ))}
      {hasNextPage && (
        <li ref={setTarget} className="skeleton-item">
          <Skeleton_ExpenseListItem />
        </li>
      )}
      {expenseList.length === 0 && (
        <Empty
          icon={<FiAlertTriangle />}
          message={LABELS.MESSAGE_NO_EXPENSES}
        />
      )}
    </ul>
  );
}
