import { NavLink } from "react-router-dom";
import Navigation_ListType from "../../../components/basic/Navigation.listType";
import { LABELS, PATH, TYPES } from "../../../global/constants";
import Button_Boxtype from "../../../components/basic/Button.boxType";
import ListHeader from "../../../components/compound/ListHeader";
import Button_Floatingtype from "../../../components/basic/Button.floatingType";
import Banner from "../../../components/banner/Banner";
import ListItem_MemberType from "../../../components/compound/ListItem.memberType";
import { useGroups } from "./Group/Group.hooks";
import { memberType } from "../../../global/customType";
import Empty from "../../../components/common/Empty";
import { FiAlertTriangle } from "react-icons/fi";
import Group_Settings from "./Group/Group.settings";
import { useRecoilValue } from "recoil";
import { currentUserAtom } from "../../../atoms/globalAtoms";
import { useHandleDialog } from "../../../components/hooks/useHandleDialog";
import { InviteMemberLayout } from "../../../global/layout";

export default function Group_SubPage() {
  const currentUser = useRecoilValue(currentUserAtom);
  const { data, fetchStatus } = useGroups(currentUser.currentGroup);
  const { showDialog } = useHandleDialog();
  const groupInfo = data.data?.groupInfo;

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
          $member={groupInfo && groupInfo.members.length}
        />
        <Button_Floatingtype
          $visiblity={
            location.pathname === PATH.MAIN_GROUP_SETTINGS ? false : true
          }
          onClick={() => {
            showDialog({
              type: TYPES.MODAL_SINGLE_COL,
              title: LABELS.LABEL_INVITE_MEMBER,
              layout: InviteMemberLayout(groupInfo.code),
            });
          }}
        />
        <section className={fetchStatus === "fetching" ? "fetching" : ""}>
          {location.pathname === PATH.MAIN_GROUP_MEMBER && (
            <>
              {groupInfo &&
                groupInfo.members.length > 0 &&
                groupInfo.members.map((member: memberType, index: number) => (
                  <ListItem_MemberType key={index} {...member} />
                ))}
              {groupInfo && groupInfo.members.length === 0 && (
                <Empty
                  icon={<FiAlertTriangle />}
                  message={LABELS.MESSAGE_NO_MEMBERS}
                />
              )}
            </>
          )}
          {location.pathname === PATH.MAIN_GROUP_SETTINGS && (
            <Group_Settings {...groupInfo} />
          )}
        </section>
      </div>
      <div className="advertise-container">
        <Banner />
      </div>
    </>
  );
}
