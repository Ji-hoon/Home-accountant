import Profile from "../basic/Profile";

import styled from "styled-components";
import { ListItemContainer } from "./ListItem.expenseType";
import { SIZES } from "../../global/constants";
import { memberType } from "../../global/customType";
// import Button_Icontype from "../basic/Button.iconType";
// import { FiMoreHorizontal } from "react-icons/fi";

export default function ListItem_MemberType({
  memberId,
  nickname,
  role,
  profileImgUrl,
}: memberType) {
  return (
    <ListItemContainer>
      <ListProfileContainer>
        <Profile url={profileImgUrl} />
      </ListProfileContainer>
      <div className="list-info">
        <h4>
          {nickname}
          <span className="role">{role}</span>
        </h4>
        <p>id: {memberId}</p>
      </div>
      {/* <Button_Icontype> //TODO: 멤버 더보기 메뉴는 추후 구현
        <FiMoreHorizontal />
      </Button_Icontype> */}
    </ListItemContainer>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
const ListProfileContainer = styled.div`
  padding: 0 ${SIZES.XS / 2}px;

  & > div {
    pointer-events: none;
  }
`;
