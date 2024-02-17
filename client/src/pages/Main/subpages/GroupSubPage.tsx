import { NavLink } from "react-router-dom";
import Navigation_ListType from "../../../components/basic/Navigation.listType";
import { LABELS, PATH, TYPES } from "../../../global/constants";
import Button_Boxtype from "../../../components/basic/Button.boxType";
import ListHeader from "../../../components/compound/ListHeader";
import Button_Floatingtype from "../../../components/basic/Button.floatingType";
import Banner from "../../../components/banner/Banner";

import Group_Settings from "./Group/Group.settings";
import { useRecoilValue } from "recoil";
import { currentUserAtom } from "../../../atoms/globalAtoms";
import { useHandleDialog } from "../../../components/hooks/useHandleDialog";
import { InviteMemberLayout } from "../../../global/layout";
import Group_Members from "./Group/Group.members";
import { FormListLayoutType } from "../../../global/customType";

export default function Group_SubPage() {
  const currentUser = useRecoilValue(currentUserAtom);
  const { showDialog } = useHandleDialog();

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
            {currentUser.currentRole === TYPES.OWNER && (
              <NavLink to={PATH.MAIN_GROUP_SETTINGS}>
                <Button_Boxtype>
                  {LABELS.NAVIGATION_MENU_GROUP_SETTINGS}
                </Button_Boxtype>
              </NavLink>
            )}
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
        />
        <Button_Floatingtype
          $visiblity={
            location.pathname === PATH.MAIN_GROUP_SETTINGS ? false : true
          }
          onClick={() => {
            showDialog({
              type: TYPES.MODAL_SINGLE_COL,
              title: LABELS.LABEL_INVITE_MEMBER,
              layout: InviteMemberLayout as FormListLayoutType[],
            });
          }}
        />
        {location.pathname === PATH.MAIN_GROUP_MEMBER && <Group_Members />}
        {location.pathname === PATH.MAIN_GROUP_SETTINGS && <Group_Settings />}
      </div>
      <div className="advertise-container">
        <Banner />
      </div>
    </>
  );
}
