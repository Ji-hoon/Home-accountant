import { NavLink } from "react-router-dom";
import Navigation_ListType from "../../../components/basic/Navigation.listType";
import Button_Boxtype from "../../../components/basic/Button.boxType";

import { LABELS, PATH, TYPES } from "../../../global/constants";
import ListHeader from "../../../components/compound/ListHeader";
import Button_Floatingtype from "../../../components/basic/Button.floatingType";
import { useHandleDialog } from "../../../components/hooks/useHandleDialog";
import { CreateExpenseLayout } from "../../../global/layout";
import { FormListLayoutType } from "../../../global/customType";
import { useCallback } from "react";
import ExpenseList from "./Expenses/Expenses.infiniteList";
import Banner from "../../../components/banner/Banner";
import ListActionBar from "../../../components/compound/ListActionBar";

export default function Expenses_SubPage() {
  const { showDialog } = useHandleDialog();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const showDialogCallback = useCallback(showDialog, []);

  console.log("subpage");

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
        <ListHeader $type={TYPES.EXPENSES} />
        <Button_Floatingtype
          onClick={() => {
            showDialogCallback({
              type: TYPES.MODAL_DOUBLE_COL,
              title: LABELS.LABEL_ADD_EXPENSE,
              layout: CreateExpenseLayout as FormListLayoutType[],
            });
          }}
        />
        <ListActionBar />
        <ExpenseList id="expenses" />
      </div>
      <div className="advertise-container">
        <Banner />
      </div>
    </>
  );
}
