/* eslint-disable react-refresh/only-export-components */
import Profile from "../basic/Profile";

import styled from "styled-components";
import { ListItemContainer } from "./ListItem.expenseType";
import { LABELS, SIZES, COLORS, TYPES } from "../../global/constants";
import { memberType } from "../../global/customType";
import { format } from "date-fns";
import { FiCalendar } from "react-icons/fi";

import Button_Icontype from "../basic/Button.iconType";
import { FiMoreHorizontal } from "react-icons/fi";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentUserAtom, dropdownOpenAtom } from "../../atoms/globalAtoms";
import Dropdown from "../dropdown/Dropdown";
import Dropdown_Member from "../dropdown/Dropdown.Member";
import { useEffect, useRef, useState } from "react";
import { calculateElementPositionAndSize } from "../util/handleElement";
import { throttle } from "lodash";

export default function ListItem_MemberType({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  userId,
  nickname,
  role,
  profileImgUrl,
  joinedAt,
}: memberType) {
  const currentUser = useRecoilValue(currentUserAtom);
  const [showDropdown, setShowDropdown] = useRecoilState(dropdownOpenAtom);
  const [targetPosition, setTargetPosition] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const profileRef = useRef(null);

  function handleProfileClick(e: React.SyntheticEvent) {
    const targetPos = calculateElementPositionAndSize({
      target: e.currentTarget as HTMLElement,
    });
    setTargetPosition(targetPos);
    setShowDropdown(TYPES.DROPDOWN_KEY_MEMBER);
  }

  /* resize 이벤트 발생 시 data props 갱신 */
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = throttle(() => {
    setWindowWidth(window.innerWidth);
  }, 500);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      // cleanup
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  useEffect(() => {
    if (showDropdown && profileRef.current) {
      const targetPos = calculateElementPositionAndSize({
        target: profileRef.current as HTMLElement,
      });
      setTargetPosition(targetPos);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowWidth]);
  /* resize 이벤트 발생 시 data props 갱신 */

  return (
    <ListItemContainer>
      <ListProfileContainer>
        <Profile url={profileImgUrl} />
      </ListProfileContainer>
      <div className="list-info">
        <h4>
          {nickname}
          {role === "OWNER" && (
            <RoleLabel className="role" $type={role}></RoleLabel>
          )}
        </h4>
        <JoinedDateField>
          <span>{LABELS.LABEL_GROUP_JOINED_DATE} :</span>
          <FiCalendar />
          <span title={format(joinedAt, "yyyy년 MM월 dd일")}>
            {format(joinedAt, "yyyy년 MM월 dd일 HH:MM")}
          </span>
        </JoinedDateField>
      </div>
      {role !== TYPES.OWNER && currentUser.currentRole === TYPES.OWNER && (
        <Button_Icontype onClick={handleProfileClick}>
          <FiMoreHorizontal />
        </Button_Icontype>
      )}
      {showDropdown === TYPES.DROPDOWN_KEY_MEMBER && (
        <Dropdown>
          <Dropdown_Member data={targetPosition} />
        </Dropdown>
      )}
    </ListItemContainer>
  );
}

const ListProfileContainer = styled.div`
  padding: 0 ${SIZES.XS / 2}px;

  & > div {
    pointer-events: none;
  }
`;

const JoinedDateField = styled.p`
  display: flex;
  align-items: center;
  gap: 4px;
  & > span:nth-child(1) {
    font-weight: 500;
    color: ${COLORS.GRAY_05};
  }
`;

const RoleLabel = styled.span<{
  $type: string;
}>`
  &:before {
    content: "권한";
    content: ${(props) =>
      props.$type === "OWNER"
        ? `"${LABELS.ROLE_OWNER}"`
        : `"${LABELS.ROLE_MEMBER}"`};
  }
`;
