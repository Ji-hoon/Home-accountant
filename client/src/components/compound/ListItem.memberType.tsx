/* eslint-disable react-refresh/only-export-components */
import Profile from "../basic/Profile";

import styled from "styled-components";
import { ListItemContainer } from "./ListItem.expenseType";
import { LABELS, SIZES } from "../../global/constants";
import { memberType } from "../../global/customType";
import { format } from "date-fns";
import { FiCalendar } from "react-icons/fi";

// import Button_Icontype from "../basic/Button.iconType";
// import { FiMoreHorizontal } from "react-icons/fi";

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
          <RoleLabel className="role" $type={role}></RoleLabel>
        </h4>
        <JoinedDateField>
          <FiCalendar />
          <span>가입일 : {format(joinedAt, "yyyy-MM-dd")}</span>
        </JoinedDateField>
      </div>
      {/* <Button_Icontype> //TODO: 멤버 더보기 메뉴는 추후 구현
        <FiMoreHorizontal />
      </Button_Icontype> */}
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
