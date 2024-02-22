import styled from "styled-components";
import { LABELS, SIZES, VALUES } from "../../global/constants";
import { MenuGroup_ListType } from "../compound/MenuGroup.listType";
import Button_Boxtype from "../basic/Button.boxType";
import { useDropdownProfile } from "./Dropdown.Profile.hooks";
import { currentUserAtom, dropdownOpenAtom } from "../../atoms/globalAtoms";
import { useRecoilState, useSetRecoilState } from "recoil";
import ApiBoundary from "../common/ApiBoundary";
import { format } from "date-fns";
import {
  groupListInfoType,
  groupMemberType,
  DropdownProps,
} from "../../global/customType";
import { FiCheck } from "react-icons/fi";
import { updateCurrentGroup } from "../../util/updateLocalStorage";
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
  const [currentUser, setCurrentUser] = useRecoilState(currentUserAtom);
  const setShowDropdown = useSetRecoilState(dropdownOpenAtom);
  const { result, logout } = useDropdownProfile(currentUser.userId);

  const groupList = result.data.data.groups;
  //const existUser = groupList.find((member: { userId: string; }) => member.userId === currentUser.userId);

  const ismobile = /iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent);

  return (
    <>
      {result && (
        <DropdownProfileUIContainer
          data={data}
          ismobile={ismobile}
          className={ismobile ? "mobile" : ""}
        >
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

                      setTimeout(() => {
                        location.href = import.meta.env.VITE_FRONTEND_URL;
                      }, VALUES.TIMEOUT_DELAY_TIME);
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
              <Button_Boxtype onClick={() => setShowDropdown("")}>
                {LABELS.LABEL_ACCOUNT_INFO}
              </Button_Boxtype>
            </li>
            <li>
              <Button_Boxtype
                onClick={() => {
                  logout();
                  setShowDropdown("");
                }}
              >
                {LABELS.LABEL_LOGOUT}
              </Button_Boxtype>
            </li>
          </MenuGroup_ListType>
        </DropdownProfileUIContainer>
      )}
    </>
  );
}

const DropdownProfileUIContainer = styled(DropdownUIContainerStyle)<{
  ismobile?: boolean;
}>`
  margin-top: 8px;
  margin-left: -20px;
  width: 220px;

  @media screen and (max-width: ${SIZES.MEDIA_QUERY_BP_SMALL}px) {
    width: ${(props) => props.ismobile && "100%"};
  }
`;
