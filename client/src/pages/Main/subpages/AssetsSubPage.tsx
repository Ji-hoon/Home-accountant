import { NavLink } from "react-router-dom";
import Button_Floatingtype from "../../../components/basic/Button.floatingType";
import Navigation_ListType from "../../../components/basic/Navigation.listType";
import ListHeader from "../../../components/compound/ListHeader";
import { LABELS, PATH, TYPES } from "../../../global/constants";
import Button_Boxtype from "../../../components/basic/Button.boxType";
import { FormListLayoutType } from "../../../global/customType";
import { useHandleDialog } from "../../../components/hooks/useHandleDialog";
import { CreateAssetLayout } from "../../../global/layout";

import Banner from "../../../components/banner/Banner";
import Chart from "./Assets/Chart/Assets.Chart";

export default function Assets_SubPage() {
  const { showDialog } = useHandleDialog();

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
          </>
        </Navigation_ListType>
      </div>
      <div className="list-container assets">
        <ListHeader $type={TYPES.ASSETS} />
        <Button_Floatingtype
          onClick={() =>
            showDialog({
              type: TYPES.MODAL_DOUBLE_COL,
              title: LABELS.LABEL_ADD_ASSET,
              layout: CreateAssetLayout as FormListLayoutType[],
            })
          }
        />
        <Chart />
      </div>
      <div className="advertise-container">
        <Banner />
      </div>
    </>
  );
}
