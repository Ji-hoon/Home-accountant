import styled from "styled-components";
import Button_Boxtype from "../basic/Button.boxType";
import { LABELS } from "../../global/constants";

export default function Header({ isLogin }: { isLogin: boolean }) {
  return (
    <HeaderRoot>
      <div className="logo-container">
        <a href="/" target="_self">
          <img src="/logo.png" />
        </a>
      </div>
      {isLogin && (
        <div className="menu-container">
          <a href="#" target="_self">
            {LABELS.HEADER_MENU_EXPENSES}
          </a>
          <a href="#" target="_self">
            {LABELS.HEADER_MENU_ASSETS}
          </a>
          <a href="#" target="_self">
            {LABELS.HEADER_MENU_GROUP_MGMT}
          </a>
        </div>
      )}
      {!isLogin && (
        <div className="login-button-container">
          <Button_Boxtype>{LABELS.LABEL_LOGIN}</Button_Boxtype>
        </div>
      )}
    </HeaderRoot>
  );
}

const HeaderRoot = styled.header`
  background-color: #fff;
  display: flex;
  position: sticky;
  top: 0;
  align-items: center;
  justify-content: space-between;
  padding: 16px 40px 16px 32px;

  & .logo-container a {
    font-size: 0;
    display: block;

    img {
      width: 180px;
      height: 40px;
    }
  }
`;
