import { FiAlertTriangle } from "react-icons/fi";
import Empty from "../../../../components/common/Empty";
import ListItem_ExpenseType from "../../../../components/compound/ListItem.expenseType";
import { LABELS, PATH, TYPES } from "../../../../global/constants";
import { useExpenses } from "./Expenses.hooks";
import { useHandleDialog } from "../../../../components/hooks/useHandleDialog";
import { EditExpenseLayout } from "../../../../global/layout";
import { ExpenseType, FormListLayoutType } from "../../../../global/customType";
import { useSetRecoilState, useRecoilState } from "recoil";
import {
  currentOwnerAtom,
  dateUnitAtom,
  selectedExpenseIdAtom,
} from "../../../../atoms/globalAtoms";
import Skeleton_ExpenseListItem from "../../../../components/skeleton/Skeleton.expenseListItem";
import { memo, useEffect } from "react";
import { useLocation } from "react-router";

function Expenses_List({ id }: { id?: string }) {
  console.log("list");
  const location = useLocation();

  const setSelectedExpenseId = useSetRecoilState(selectedExpenseIdAtom);
  const [dateUnit, setDateUnit] = useRecoilState(dateUnitAtom);
  const setCurrentOwner = useSetRecoilState(currentOwnerAtom);

  const { pages, setTarget, hasNextPage, fetchStatus, isFetchingNextPage } =
    useExpenses();

  const filteredExpenseList = pages.filter(
    (page) => page.dateUnit === dateUnit,
  );
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
      layout: EditExpenseLayout({
        item,
      }) as FormListLayoutType[],
    });
  }

  //TODO: owner가 "" 이 아닌 상태에서 addExpense를 통한 data 변경이 일어났을 때
  //컴포넌트가 리렌더링되며 owner가 ""인 기준의 정보가 표시되는 현상 수정 필요
  //TODO: totalAmounts refetch 테스트를 위한 코드. 추후 멤버별 지출내역 구현 시 처리 필요
  useEffect(() => {
    if (location.pathname === PATH.MAIN_EXPENSES_BY_MONTH)
      setDateUnit(TYPES.TYPE_UNIT_MONTH);
    else setDateUnit(TYPES.TYPE_UNIT_WEEK);

    //console.log(dateUnit);
    setSelectedExpenseId([]);
    setCurrentOwner("");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setDateUnit]);

  return (
    <ul
      id={id}
      className={
        fetchStatus === "fetching" && !isFetchingNextPage ? "fetching" : ""
      }
    >
      {expenseList.length > 0 &&
        filteredExpenseList &&
        expenseList.map((item, index) => (
          <ListItem_ExpenseType
            onClick={(event: React.SyntheticEvent) => handleClick(event, item)}
            key={index}
            $item={item}
          />
        ))}
      {filteredExpenseList.length > 0 && hasNextPage && (
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

// eslint-disable-next-line react-refresh/only-export-components
export default memo(Expenses_List);
