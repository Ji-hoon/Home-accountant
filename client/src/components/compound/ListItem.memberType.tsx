/* eslint-disable react-refresh/only-export-components */
import Profile from "../basic/Profile";

import styled from "styled-components";
import { ListItemContainer } from "./ListItem.expenseType";
import { LABELS, SIZES, COLORS } from "../../global/constants";
import { memberType } from "../../global/customType";
import { format } from "date-fns";
import { FiCalendar } from "react-icons/fi";

import Button_Icontype from "../basic/Button.iconType";
import { FiMoreHorizontal } from "react-icons/fi";

export default function ListItem_MemberType({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  memberId,
  nickname,
  role,
  profileImgUrl,
  joinedAt,
}: memberType) {
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
      {role !== "OWNER" && (
        <Button_Icontype>
          <FiMoreHorizontal />
        </Button_Icontype>
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
