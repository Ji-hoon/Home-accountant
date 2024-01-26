import { NavLink } from "react-router-dom";
import Button_Floatingtype from "../../../components/basic/Button.floatingType";
import Navigation_ListType from "../../../components/basic/Navigation.listType";
import ListHeader from "../../../components/compound/ListHeader";
import { LABELS, PATH, TYPES } from "../../../global/constants";
import Button_Boxtype from "../../../components/basic/Button.boxType";
import { dialogLayoutType } from "../../../global/customType";
import { useHandleDialog } from "../../../components/hooks/useHandleDialog";
import { CreateAssetLayout } from "../../../global/layout";
import { currentDateAtom, dateUnitAtom } from "../../../atoms/globalAtoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import Banner from "../../../components/banner/Banner";
import Chart from "./Assets/Chart/Assets.Chart";

export default function Assets_SubPage() {
  const { showDialog } = useHandleDialog();
  const currentDate = useRecoilValue(currentDateAtom);
  const [currentOwner, setCurrentOwner] = useState("");
  const [dateUnit, setDateUnit] = useRecoilState(dateUnitAtom);

  useEffect(() => {
    if (location.pathname === PATH.MAIN_ASSETS_BY_MONTH) {
      setDateUnit(TYPES.TYPE_UNIT_MONTH);
    } else if (location.pathname === PATH.MAIN_ASSETS_BY_YEAR) {
      setDateUnit(TYPES.TYPE_UNIT_YEAR);
    }
    setCurrentOwner("");
  }, [setDateUnit]);

  return (
    <>
      <div className="aside-navigation-container">
        <Navigation_ListType>
          <>
            <NavLink to={PATH.MAIN_ASSETS_BY_MONTH}>
              <Button_Boxtype>
                {LABELS.NAVIGATION_MENU_ASSETS_BY_MONTH}
              </Button_Boxtype>
            </NavLink>
            {/* TODO: 연간 자산 조회 기능은 상세 기획 후 구현
            <NavLink to={PATH.MAIN_ASSETS_BY_YEAR}>
              <Button_Boxtype>
                {LABELS.NAVIGATION_MENU_ASSETS_BY_YEAR}
              </Button_Boxtype>
            </NavLink> */}
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
          $type={TYPES.ASSETS}
          $owner={currentOwner}
        />
        <Button_Floatingtype
          onClick={() =>
            showDialog({
              type: TYPES.MODAL_SINGLE_COL,
              title: LABELS.LABEL_ADD_ASSET,
              layout: CreateAssetLayout as dialogLayoutType[],
            })
          }
        />
        <Chart
          $currentDate={currentDate}
          $unit={dateUnit}
          $owner={currentOwner}
        />
      </div>
      <div className="advertise-container">
        <Banner />
      </div>
    </>
  );
}
