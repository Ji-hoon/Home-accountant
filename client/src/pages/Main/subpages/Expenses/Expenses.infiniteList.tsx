import { FiAlertTriangle } from "react-icons/fi";
import Empty from "../../../../components/common/Empty";
import ListItem_ExpenseType from "../../../../components/compound/ListItem.expenseType";
import { LABELS, PATH, TYPES } from "../../../../global/constants";
import { useExpenses } from "./Expenses.hooks";
import { useHandleDialog } from "../../../../components/hooks/useHandleDialog";
import { EditExpenseLayout } from "../../../../global/layout";
import { ExpenseType, FormListLayoutType } from "../../../../global/customType";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  currentUserAtom,
  dateUnitAtom,
  selectedExpenseIdAtom,
  currentOwnerAtom,
  currentDateAtom,
} from "../../../../atoms/globalAtoms";
import Skeleton_ExpenseListItem from "../../../../components/skeleton/Skeleton.expenseListItem";
import { useEffect } from "react";
import { useLocation } from "react-router";

export default function Expenses_List() {
  const location = useLocation();
  const [currentOwner, setCurrentOwner] = useRecoilState(currentOwnerAtom);
  const currentUser = useRecoilValue(currentUserAtom);
  const currentDate = useRecoilValue(currentDateAtom);
  const setSelectedExpenseId = useSetRecoilState(selectedExpenseIdAtom);
  const [dateUnit, setDateUnit] = useRecoilState(dateUnitAtom);

  const { pages, setTarget, hasNextPage, fetchStatus, isFetchingNextPage } =
    useExpenses({
      owner: currentOwner,
      currentGroupId: currentUser.currentGroup,
      currentDate: currentDate,
      unit: dateUnit,
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
      layout: EditExpenseLayout({
        item,
      }) as FormListLayoutType[],
    });
  }

  //TODO: owner가 "" 이 아닌 상태에서 addExpense를 통한 data 변경이 일어났을 때
  //컴포넌트가 리렌더링되며 owner가 ""인 기준의 정보가 표시되는 현상 수정 필요
  //TODO: totalAmounts refetch 테스트를 위한 코드. 추후 멤버별 지출내역 구현 시 처리 필요
  useEffect(() => {
    if (location.pathname === PATH.MAIN_EXPENSES_BY_MONTH) {
      //setCurrentOwner("");
      setDateUnit(TYPES.TYPE_UNIT_MONTH);
    } else if (location.pathname === PATH.MAIN_EXPENSES_BY_WEEK) {
      //setCurrentOwner("");
      setDateUnit(TYPES.TYPE_UNIT_WEEK);
    }
    //console.log(dateUnit);
    setSelectedExpenseId([]);
    setCurrentOwner("");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

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
