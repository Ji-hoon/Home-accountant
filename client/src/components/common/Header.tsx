import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { LABELS, PATH } from "../../global/constants";
import Button_Boxtype from "../basic/Button.boxType";
import Navigation_MenuType from "../basic/Navigation.menuType";

export default function Header({ isLogin }: { isLogin: boolean }) {
  return (
    <HeaderRoot>
      <div className="header-inner-container">
        <div className="logo-container">
          <a href="/" target="_self">
            <img src="/img-logo.png" />
          </a>
        </div>
        {isLogin && (
          <>
            <Navigation_MenuType>
              <>
                <NavLink to={PATH.MAIN_EXPENSES} className="active">
                  <Button_Boxtype>{LABELS.HEADER_MENU_EXPENSES}</Button_Boxtype>
                </NavLink>
                <NavLink to={PATH.MAIN_ASSETS}>
                  <Button_Boxtype>{LABELS.HEADER_MENU_ASSETS}</Button_Boxtype>
                </NavLink>
                <NavLink to={PATH.MAIN_GROUP}>
                  <Button_Boxtype>
                    {LABELS.HEADER_MENU_GROUP_MGMT}
                  </Button_Boxtype>
                </NavLink>
              </>
            </Navigation_MenuType>
            <div>알림 & 프로필</div>
          </>
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
  min-height: 80px;

  & .header-inner-container {
    max-width: 1200px;
    //min-height: 48px;
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

  & nav {
    transform: translateX(-32px);
  }
`;
