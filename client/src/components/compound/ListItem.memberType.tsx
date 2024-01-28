import Profile from "../basic/Profile";
import { FiMoreHorizontal } from "react-icons/fi";
import styled from "styled-components";
import { ListItemContainer } from "./ListItem.expenseType";
import { URLS, SIZES } from "../../global/constants";
import Button_Icontype from "../basic/Button.iconType";

export default function ListItem_MemberType() {
  return (
    <ListItemContainer>
      <ListProfileContainer>
        <Profile url={URLS.DEFAULT_PROFILE} />
      </ListProfileContainer>
      <div className="list-info">
        <h4>
          멤버 이름
          <span className="role">소유자</span>
        </h4>
        <p>멤버 이메일 주소</p>
      </div>
      <Button_Icontype>
        <FiMoreHorizontal />
      </Button_Icontype>
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
