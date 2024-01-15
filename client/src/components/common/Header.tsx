import styled from "styled-components";
import Button_Boxtype from "../basic/Button.boxType";
import { NavLink } from "react-router-dom";
import { LABELS, PATH } from "../../global/constants";

export default function Header({ isLogin }: { isLogin: boolean }) {
  return (
    <HeaderRoot>
      <div className="HeaderInnerContainer">
        <div className="logo-container">
          <a href="/" target="_self">
            <img src="/img-logo.png" />
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
            <NavLink to={PATH.LOGIN}>
              <Button_Boxtype>{LABELS.LABEL_LOGIN}</Button_Boxtype>
            </NavLink>
          </div>
        )}
      </div>
    </HeaderRoot>
  );
}

const HeaderRoot = styled.header`
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(15px);

  position: sticky;
  top: 0;
  z-index: 11;

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
