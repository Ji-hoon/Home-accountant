import { NavLink } from "react-router-dom";
import Navigation_ListType from "../../../components/basic/Navigation.listType";
import { LABELS, PATH, TYPES } from "../../../global/constants";
import Button_Boxtype from "../../../components/basic/Button.boxType";
import ListHeader from "../../../components/compound/ListHeader";
import Button_Floatingtype from "../../../components/basic/Button.floatingType";
import Banner from "../../../components/banner/Banner";
import ListItem_MemberType from "../../../components/compound/ListItem.memberType";

export default function Group_SubPage() {
  return (
    <>
      <div className="aside-navigation-container">
        <Navigation_ListType>
          <>
            <NavLink to={PATH.MAIN_GROUP_MEMBER}>
              <Button_Boxtype>
                {LABELS.NAVIGATION_MENU_GROUP_MEMBER}
              </Button_Boxtype>
            </NavLink>
            <NavLink to={PATH.MAIN_GROUP_SETTINGS}>
              <Button_Boxtype>
                {LABELS.NAVIGATION_MENU_GROUP_SETTINGS}
              </Button_Boxtype>
            </NavLink>
          </>
        </Navigation_ListType>
      </div>
      <div className="list-container">
        <ListHeader
          $type={
            location.pathname === PATH.MAIN_GROUP_MEMBER
              ? TYPES.MEMBER
              : TYPES.GROUP
          }
          $member={2}
        />
        <Button_Floatingtype
          $visiblity={
            location.pathname === PATH.MAIN_GROUP_SETTINGS ? false : true
          }
          onClick={
            () => {}
            // showDialog({
            //   type: TYPES.MODAL_DOUBLE_COL,
            //   title: LABELS.LABEL_ADD_ASSET,
            //   layout: CreateAssetLayout as dialogLayoutType[],
            // })
          }
        />
        <section>
          {location.pathname === PATH.MAIN_GROUP_MEMBER && (
            <>
              <ListItem_MemberType />
              <ListItem_MemberType />
            </>
          )}
          {location.pathname === PATH.MAIN_GROUP_SETTINGS && (
            <>그룹 설정 페이지</>
          )}
        </section>
      </div>
      <div className="advertise-container">
        <Banner />
      </div>
    </>
  );
}
