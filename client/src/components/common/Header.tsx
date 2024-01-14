import styled from "styled-components";
import Button_Boxtype from "../basic/Button.boxType";
import { LABELS } from "../../global/constants";

export default function Header({ isLogin }: { isLogin: boolean }) {
  return (
    <HeaderRoot>
      <div className="HeaderInnerContainer">
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
      </div>
    </HeaderRoot>
  );
}

const HeaderRoot = styled.header`
  background-color: #fff;

  position: sticky;
  top: 0;

  padding: 16px 40px 16px 32px;

  & .HeaderInnerContainer {
    max-width: 1200px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;
  }

  & .logo-container a {
    font-size: 0;
    display: block;

    img {
      width: 180px;
      height: 40px;
    }
  }
`;
