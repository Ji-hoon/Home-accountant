import styled from "styled-components";
import { COLORS } from "../../global/constants";

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

  & a.active:before {
    content: "";
    position: absolute;
    height: 4px;
    width: 48px;
    bottom: -16px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    background-color: ${COLORS.BRAND_DEEP};
    -webkit-transform: translateX(-24px);
    transform: translateX(-24px);
  }

  & button {
    background-color: transparent;

    &:hover {
      background-color: ${COLORS.GRAY_01};
    }
  }
`;
