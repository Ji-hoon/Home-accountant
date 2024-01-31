import { NavLink, useLocation } from "react-router-dom";
import Navigation_ListType from "../../../components/basic/Navigation.listType";
import Button_Boxtype from "../../../components/basic/Button.boxType";

import { LABELS, PATH, TYPES } from "../../../global/constants";
import ListHeader from "../../../components/compound/ListHeader";
import Button_Floatingtype from "../../../components/basic/Button.floatingType";
import { useHandleDialog } from "../../../components/hooks/useHandleDialog";
import { CreateExpenseLayout } from "../../../global/layout";
import { FormListLayoutType } from "../../../global/customType";
import { useEffect, useState } from "react";
import ExpenseList from "./Expenses/Expenses.infiniteList";
import {
  currentDateAtom,
  dateUnitAtom,
  selectedExpenseIdAtom,
} from "../../../atoms/globalAtoms";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import Banner from "../../../components/banner/Banner";
import ListActionBar from "../../../components/compound/ListActionBar";

export default function Expenses_SubPage() {
  const currentDate = useRecoilValue(currentDateAtom);
  const location = useLocation();
  const [currentOwner, setCurrentOwner] = useState("");
  const [dateUnit, setDateUnit] = useRecoilState(dateUnitAtom);
  const { showDialog } = useHandleDialog();
  const setSelectedExpenseId = useSetRecoilState(selectedExpenseIdAtom);

  //TODO: owner가 "" 이 아닌 상태에서 addExpense를 통한 data 변경이 일어났을 때
  //컴포넌트가 리렌더링되며 owner가 ""인 기준의 정보가 표시되는 현상 수정 필요
  //TODO: totalAmounts refetch 테스트를 위한 코드. 추후 멤버별 지출내역 구현 시 처리 필요
  useEffect(() => {
    if (location.pathname === PATH.MAIN_EXPENSES_BY_MEMBER) {
      setCurrentOwner("밀크티");
      setDateUnit(TYPES.TYPE_UNIT_MONTH);
    } else if (location.pathname === PATH.MAIN_EXPENSES_BY_MONTH) {
      //setCurrentOwner("");
      setDateUnit(TYPES.TYPE_UNIT_MONTH);
    } else if (location.pathname === PATH.MAIN_EXPENSES_BY_WEEK) {
      //setCurrentOwner("");
      setDateUnit(TYPES.TYPE_UNIT_WEEK);
    }
    //console.log(dateUnit);
    setSelectedExpenseId([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, dateUnit]);

  return (
    <>
      <div className="aside-navigation-container">
        <Navigation_ListType>
          <>
            <NavLink to={PATH.MAIN_EXPENSES_BY_WEEK}>
              <Button_Boxtype>
                {LABELS.NAVIGATION_MENU_EXPENSES_BY_WEEK}
              </Button_Boxtype>
            </NavLink>
            <NavLink to={PATH.MAIN_EXPENSES_BY_MONTH}>
              <Button_Boxtype>
                {LABELS.NAVIGATION_MENU_EXPENSES_BY_MONTH}
              </Button_Boxtype>
            </NavLink>
            {/* TODO: 멤버별 지출 내역 조회는 추후 필터로 구현 <NavLink to={PATH.MAIN_EXPENSES_BY_MEMBER}>
              <Button_Boxtype>
                {LABELS.NAVIGATION_MENU_EXPENSES_BY_MEMBER}
              </Button_Boxtype>
            </NavLink> */}
          </>
        </Navigation_ListType>
      </div>
      <div className="list-container">
        <ListHeader
          $currentDate={currentDate}
          $unit={dateUnit}
          $type={TYPES.EXPENSES}
          $owner={currentOwner}
        />
        <Button_Floatingtype
          onClick={() =>
            showDialog({
              type: TYPES.MODAL_DOUBLE_COL,
              title: LABELS.LABEL_ADD_EXPENSE,
              layout: CreateExpenseLayout as FormListLayoutType[],
            })
          }
        />
        <ListActionBar />
        <ExpenseList
          $owner={currentOwner}
          $currentDate={currentDate}
          $unit={dateUnit}
        />
      </div>
      <div className="advertise-container">
        <Banner />
      </div>
    </>
  );
}
