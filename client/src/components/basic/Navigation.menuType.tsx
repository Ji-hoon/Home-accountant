import styled from "styled-components";
import { COLORS, SIZES } from "../../global/constants";

export default function Navigation_MenuType({
  children,
}: {
  children: React.ReactElement | string;
}) {
  return <NavigationMenutypeContainer>{children}</NavigationMenutypeContainer>;
}

// eslint-disable-next-line react-refresh/only-export-components
const NavigationMenutypeContainer = styled.nav`
  display: flex;
  gap: ${SIZES.SM / 2}px;

  & a:before {
    content: "";
    position: absolute;
    height: 5px;
    width: 48px;
    bottom: -20px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    background-color: ${COLORS.BRAND_DEEP};

    -webkit-transform: translate(-24px, 1px);
    transform: translate(-24px, 1px);

    -webkit-transition: all 100ms ease-out;
    transition: all 200ms ease-out;
  }

  & a.active:before {
    -webkit-transform: translate(-24px, -4px);
    transform: translate(-24px, -4px);
  }

  & a.active button {
    font-weight: 700;
    color: ${COLORS.GRAY_10};
  }

  & button {
    /* font-weight: 600; */
    background-color: transparent;
    color: ${COLORS.GRAY_07};

    &:hover {
      background-color: ${COLORS.GRAY_01_OVERAY};
    }
    &:active {
      background-color: ${COLORS.GRAY_03_OVERAY};
    }
  }
`;
