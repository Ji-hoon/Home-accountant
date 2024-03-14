import styled from "styled-components";
import { COLORS, SIZES } from "../../global/constants";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import Navigation_ListType_Cursor from "./Navigation.listType.focus";

export default function Navigation_ListType({
  children,
}: {
  children: React.ReactElement | string;
}) {
  const location = useLocation();
  const [pathname, setPathname] = useState("");

  const navRef = useRef<HTMLDivElement>(null);
  const navLength = navRef.current?.getElementsByTagName("a").length;

  const menuItems = navRef.current?.getElementsByTagName("a");
  const activeMenu = Array.from(menuItems ? menuItems : []).find(
    (menu) => menu.pathname === pathname,
  );

  useEffect(() => {
    setPathname(location.pathname);
  }, [location, navLength, activeMenu]);

  return (
    <NavigationListtypeContainer ref={navRef} $navLength={navLength}>
      {children}
      <Navigation_ListType_Cursor $menu={activeMenu} />
    </NavigationListtypeContainer>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
const NavigationListtypeContainer = styled.nav<{
  $navLength: number | undefined;
}>`
  display: flex;
  flex-direction: column;
  padding: ${SIZES.XL}px ${SIZES.LG}px;
  gap: ${SIZES.SM / 2}px;

  & a button {
    background-color: inherit;
    width: 100%;

    &:hover {
      background-color: ${COLORS.GRAY_01_OVERAY};
    }
    &:active {
      background-color: ${COLORS.GRAY_03_OVERAY};
    }
  }

  & a.active button {
    background-color: ${COLORS.BRAND_LIGHT};
  }

  @media screen and (max-width: ${SIZES.MEDIA_QUERY_BP_MEDIUM}px) {
    flex-direction: row;
    justify-content: center;
    display: ${(props) => (props.$navLength === 1 ? "none" : "flex")};

    padding: ${SIZES.XXS / 2}px ${SIZES.XXS / 2}px !important;
    gap: ${SIZES.SM / 4}px;
    margin: ${SIZES.MD}px;
    border-radius: ${SIZES.LG * 2}px;

    background-color: ${COLORS.GRAY_00};
    box-shadow: inset 0 1px 3px -2px ${COLORS.GRAY_03_OVERAY};

    position: relative;
    top: auto;

    & a {
      button {
        border-radius: 40px;
        padding: ${SIZES.XL / 2}px ${SIZES.XL}px;
        min-width: ${SIZES.XL * 5}px;
        text-align: center;
        justify-content: center;
        position: relative;
        &:hover {
          background-color: transparent;
        }
      }
      &.active button {
        background-color: transparent;
        color: ${COLORS.BASIC_BLACK};
      }
    }
  }
`;
