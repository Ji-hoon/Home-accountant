import styled from "styled-components";
import { FiBell } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { LABELS, PATH, URLS, SIZES, COLORS } from "../../global/constants";
import Button_Boxtype from "../basic/Button.boxType";
import Navigation_MenuType from "../basic/Navigation.menuType";
import Button_Icontype from "../basic/Button.iconType";
import Profile from "../basic/Profile";
import { useRecoilValue } from "recoil";
import { isLoginAtom } from "../../atoms/globalAtoms";

export default function Header() {
  const isLogin = useRecoilValue(isLoginAtom); // login 여부를 판별하는 상태.

  return (
    <HeaderRoot isLogin={isLogin}>
      <div className="header-inner-container">
        <div className="logo-container">
          <NavLink to={PATH.ROOT}>
            <img src="/img-logo.png" />
          </NavLink>
        </div>
        {isLogin && (
          <>
            <Navigation_MenuType>
              <>
                <NavLink to={PATH.MAIN_EXPENSES}>
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
            <div className="noti-and-profile-container">
              <Button_Icontype>
                <FiBell />
              </Button_Icontype>
              <Profile url={URLS.DEFAULT_PROFILE} />
            </div>
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

const HeaderRoot = styled.header<{
  isLogin?: boolean;
}>`
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(15px);

  position: sticky;
  top: 0;
  z-index: 11;

  padding: 16px 40px 16px 32px;
  min-height: 80px;
  overflow: hidden;

  box-shadow: inset 0 -1px 0 0 ${(props) => (props.isLogin ? COLORS.GRAY_01_OVERAY : "transparent")};

  & .header-inner-container {
    max-width: 1200px;
    //min-height: 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;
  }

  & .noti-and-profile-container {
    display: flex;
    gap: ${SIZES.SM / 2}px;
  }

  & .logo-container a {
    font-size: 0;
    display: block;

    img {
      width: 180px;
      height: 40px;
    }
  }

  & .login-button-container {
    & button {
      background-color: ${COLORS.GRAY_01_OVERAY};

      &:hover {
        background-color: ${COLORS.GRAY_03_OVERAY};
      }
    }
  }

  & nav {
    -webkit-transform: translateX(-24px);
    transform: translateX(-24px);
  }
`;
