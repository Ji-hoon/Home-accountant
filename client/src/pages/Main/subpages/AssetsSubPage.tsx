import { NavLink } from "react-router-dom";
import Button_Floatingtype from "../../../components/basic/Button.floatingType";
import Navigation_ListType from "../../../components/basic/Navigation.listType";
import ListHeader from "../../../components/compound/ListHeader";
import { LABELS, PATH, TYPES, URLS } from "../../../global/constants";
import Button_Boxtype from "../../../components/basic/Button.boxType";
import { dialogLayoutType } from "../../../global/customType";
import { useHandleDialog } from "../../../components/hooks/useHandleDialog";
import { CreateExpenseLayout } from "../../../global/layout";
import { currentDateAtom, dateUnitAtom } from "../../../atoms/globalAtoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { useEffect, useState } from "react";

export default function Assets_SubPage() {
  const { showDialog } = useHandleDialog();
  const currentDate = useRecoilValue(currentDateAtom);
  const [currentOwner, setCurrentOwner] = useState("");
  const [dateUnit, setDateUnit] = useRecoilState(dateUnitAtom);

  useEffect(() => {
    setDateUnit("MONTH");
    setCurrentOwner("");
  }, [setDateUnit]);

  return (
    <>
      <div className="aside-navigation-container">
        <Navigation_ListType>
          <>
            <NavLink to={PATH.MAIN_ASSETS_FILTER_BY_PERIOD}>
              <Button_Boxtype>
                {LABELS.NAVIGATION_MENU_ASSETS_BY_PERIOD}
              </Button_Boxtype>
            </NavLink>
            <NavLink to={PATH.MAIN_ASSETS_FILTER_BY_MEMBER}>
              <Button_Boxtype>
                {LABELS.NAVIGATION_MENU_ASSETS_BY_MEMBER}
              </Button_Boxtype>
            </NavLink>
            {/* TODO: 멤버별 지출 내역 조회는 추후 필터로 구현 <NavLink to={PATH.MAIN_EXPENSES_FILTER_BY_MEMBER}>
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
          $type={TYPES.ASSETS}
          $owner={currentOwner}
        />
        <Button_Floatingtype
          onClick={() =>
            showDialog({
              type: TYPES.MODAL_DOUBLE_COL,
              title: LABELS.LABEL_ADD_EXPENSE,
              layout: CreateExpenseLayout as dialogLayoutType[],
            })
          }
        />
        <>자산 내역 목록</>
      </div>
      <div className="advertise-container">
        <img src={URLS.AD_MOCK_IMAGE} />
      </div>
    </>
  );
}
