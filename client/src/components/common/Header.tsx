import styled from "styled-components";
import { FiBell } from "react-icons/fi";
import { NavLink, useLocation } from "react-router-dom";
import {
  LABELS,
  PATH,
  URLS,
  SIZES,
  COLORS,
  TYPES,
} from "../../global/constants";
import Button_Boxtype from "../basic/Button.boxType";
import Navigation_MenuType from "../basic/Navigation.menuType";
import Button_Icontype from "../basic/Button.iconType";
import Profile from "../basic/Profile";
import { useRecoilValue } from "recoil";
import { isLoginAtom } from "../../atoms/globalAtoms";
import { currentUserType } from "../../global/customType";
import { useEffect, useLayoutEffect, useState } from "react";
import { throttle } from "lodash";
import Button_Dropdowntype from "../basic/Button.dropdownType";

export default function Header({ user }: { user?: currentUserType }) {
  const isLogin = useRecoilValue(isLoginAtom); // login 여부를 판별하는 상태.
  const location = useLocation();
  const currentPath = location.pathname;
  // console.log(currentPath);

  const [width, setWidth] = useState(window.innerWidth);

  const [isLandingPath, setIsLandingPath] = useState(false);

  useLayoutEffect(() => {
    if (
      (currentPath === PATH.ROOT && !isLogin) ||
      (currentPath === PATH.LOGIN && !isLogin) ||
      currentPath === PATH.INVITATION
    ) {
      setIsLandingPath(true);
      return;
    }
    setIsLandingPath(false);
  }, [currentPath, isLogin]);

  const handleResize = throttle(() => {
    setWidth(window.innerWidth);
  }, 500);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  const headerMenuOptions = [
    { name: LABELS.HEADER_MENU_EXPENSES, url: PATH.MAIN_EXPENSES },
    { name: LABELS.HEADER_MENU_ASSETS, url: PATH.MAIN_ASSETS },
    { name: LABELS.HEADER_MENU_GROUP_MGMT, url: PATH.MAIN_GROUP },
  ];

  return (
    <HeaderRoot $islogin={isLogin.toString()} $isLandingPath={isLandingPath}>
      <div className="header-inner-container">
        <div className="logo-container">
          <NavLink to={PATH.ROOT}>
            <img src="/img-logo.png" />
          </NavLink>
        </div>
        {isLogin && !currentPath.includes(PATH.INVITATION) && (
          <>
            {width > 500 && (
              <Navigation_MenuType>
                <>
                  <NavLink to={PATH.MAIN_EXPENSES}>
                    <Button_Boxtype>
                      {LABELS.HEADER_MENU_EXPENSES}
                    </Button_Boxtype>
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
            )}
            {width <= 500 && (
              <nav className="dropdown">
                <Button_Dropdowntype
                  dropdownType={TYPES.DROPDOWN_KEY_HEADER_NAV}
                  dropdownId={user?.userId}
                  options={headerMenuOptions}
                >
                  <>
                    {location.pathname.includes(PATH.MAIN_EXPENSES)
                      ? LABELS.HEADER_MENU_EXPENSES
                      : location.pathname.includes(PATH.MAIN_ASSETS)
                        ? LABELS.HEADER_MENU_ASSETS
                        : location.pathname.includes(PATH.MAIN_GROUP)
                          ? LABELS.HEADER_MENU_GROUP_MGMT
                          : "로딩중..."}
                  </>
                </Button_Dropdowntype>
              </nav>
            )}
          </>
        )}
        {isLogin && (
          <div className="noti-and-profile-container">
            <Button_Icontype
              dropdownType={TYPES.DROPDOWN_KEY_NOTIFICATION}
              dropdownId={user?.userId}
            >
              <FiBell />
            </Button_Icontype>
            <Profile
              dropdownType={TYPES.DROPDOWN_KEY_PROFILE}
              dropdownId={user?.userId}
              url={user && user.profile ? user.profile : URLS.DEFAULT_PROFILE}
            />
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

const HeaderRoot = styled.header<{
  $islogin?: string;
  $isLandingPath: boolean;
}>`
  background-color: rgba(255, 255, 255, 0.9);
  -webkit-backdrop-filter: blur(15px);
  backdrop-filter: blur(15px);

  position: sticky;
  top: 0;
  z-index: 11;

  padding: 16px 40px 16px 32px;
  min-height: 80px;
  overflow: hidden;

  box-shadow: inset 0 -1px 0 0 ${(props) => (props.$islogin === "true" ? COLORS.GRAY_01_OVERAY : "transparent")};

  & .header-inner-container {
    max-width: ${SIZES.MAX_WIDTH}px;
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

  & .logo-container {
    padding: 4px 0;

    & a {
      font-size: 0;
      display: block;
    }

    & img {
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
    -webkit-transform: translateX(0px);
    transform: translateX(0px);
    flex-grow: 1;
    padding-left: 0px;
    padding-right: 16px;
    justify-content: center;
  }
  @media screen and (max-width: ${SIZES.MEDIA_QUERY_BP_X_LARGE}px) {
    nav {
      padding-left: 8px;
      padding-right: 0px;
    }
  }

  @media screen and (max-width: ${SIZES.MEDIA_QUERY_BP_LARGE}px) {
    padding-right: 24px;
    padding-left: 18px;

    .logo-container {
      width: 40px;
      overflow: ${(props) => (props.$isLandingPath ? "visible" : "hidden")};

      img {
        width: ${(props) => (props.$isLandingPath ? "auto" : "40px")};
        object-fit: cover;
        object-position: left;
      }
    }
    nav {
      padding-left: 40px;

      button {
        padding-left: 16px;
        padding-right: 16px;
      }
    }
  }

  @media screen and (max-width: ${SIZES.MEDIA_QUERY_BP_MEDIUM}px) {
    nav {
      padding-left: 8px;
      padding-right: 8px;
    }
  }

  @media screen and (max-width: ${SIZES.MEDIA_QUERY_BP_SMALL}px) {
    padding-top: 12px;
    padding-bottom: 12px;
    min-height: 72px;

    nav:not(.dropdown) {
      display: none;
    }

    nav.dropdown {
      padding-left: 12px;
      display: flex;

      & button {
        box-shadow: inset 0 0 0 1px ${COLORS.GRAY_01_OVERAY};
        width: 100%;
      }
      & button:not(:hover):not(:active):not(.active) {
        background-color: transparent;
      }
    }
  }
`;
