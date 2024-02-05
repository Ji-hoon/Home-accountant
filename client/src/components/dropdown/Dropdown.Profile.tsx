import styled from "styled-components";
import { LABELS, PATH } from "../../global/constants";
import { MenuGroup_ListType } from "../compound/MenuGroup.listType";
import Button_Boxtype from "../basic/Button.boxType";
import { useDropdownProfile } from "./Dropdown.Profile.hooks";
import { currentUserAtom, dropdownOpenAtom } from "../../atoms/globalAtoms";
import { useRecoilState, useSetRecoilState } from "recoil";
import ApiBoundary from "../../global/ApiBoundary";
import { format } from "date-fns";
import {
  groupListInfoType,
  groupMemberType,
  DropdownProps,
} from "../../global/customType";
import { FiCheck } from "react-icons/fi";
import { updateCurrentGroup } from "../../util/updateLocalStorage";
import { useNavigate } from "react-router";
import { DropdownUIContainerStyle } from "./Dropdown";
import toast from "react-hot-toast";

// eslint-disable-next-line react-refresh/only-export-components
export default function Dropdown_Profile(props: DropdownProps) {
  return (
    <ApiBoundary>
      <ApiComponent {...props} />
    </ApiBoundary>
  );
}

export function ApiComponent({ data }: DropdownProps) {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useRecoilState(currentUserAtom);
  const setShowDropdown = useSetRecoilState(dropdownOpenAtom);
  const { result, logout } = useDropdownProfile(currentUser.userId);

  const groupList = result.data.data.groups;
  //const existUser = groupList.find((member: { userId: string; }) => member.userId === currentUser.userId);

  return (
    <>
      {result && (
        <DropdownProfileUIContainer data={data}>
          <MenuGroup_ListType title={LABELS.LABEL_GROUP}>
            {groupList &&
              groupList.map((group: groupListInfoType, index: number) => (
                <li key={index}>
                  <Button_Boxtype
                    onClick={() => {
                      const role = group.members.reduce(
                        (acc: string | null, member: groupMemberType) => {
                          if (
                            member.userId.toString() ===
                            currentUser.userId.toString()
                          ) {
                            return member.role;
                          }
                          return acc;
                        },
                        null,
                      );
                      const newUserInfo = updateCurrentGroup({
                        groupId: group._id,
                        role: role as string,
                      });

                      toast.success(
                        `${group.name} ${LABELS.MESSAGE_GROUP_CHANGED}`,
                      );
                      setCurrentUser(() => newUserInfo);
                      setShowDropdown("");
                      navigate(PATH.MAIN_EXPENSES);
                    }}
                  >
                    <p>
                      <strong
                        className={
                          currentUser.currentGroup === group._id ? "active" : ""
                        }
                      >
                        {group.name}
                        {currentUser.currentGroup === group._id && (
                          <FiCheck strokeWidth={4} />
                        )}
                      </strong>
                      <span>
                        {format(group.createdAt, "yyyy년 M월 d일")}에 생성됨
                      </span>
                    </p>
                  </Button_Boxtype>
                </li>
              ))}
          </MenuGroup_ListType>
          <MenuGroup_ListType title={LABELS.LABEL_ACCOUNT}>
            <li>
              <Button_Boxtype>{LABELS.LABEL_ACCOUNT_INFO}</Button_Boxtype>
            </li>
            <li>
              <Button_Boxtype onClick={() => logout()}>
                {LABELS.LABEL_LOGOUT}
              </Button_Boxtype>
            </li>
          </MenuGroup_ListType>
        </DropdownProfileUIContainer>
      )}
    </>
  );
}

const DropdownProfileUIContainer = styled(DropdownUIContainerStyle)`
  margin-top: 8px;
  margin-left: -20px;
  width: 220px;
`;
