import styled from "styled-components";
import { COLORS, SIZES } from "../../global/constants";

export default function Navigation_ListType({
  children,
}: {
  children: React.ReactElement | string;
}) {
  return <NavigationListtypeContainer>{children}</NavigationListtypeContainer>;
}

// eslint-disable-next-line react-refresh/only-export-components
const NavigationListtypeContainer = styled.nav`
  display: flex;
  flex-direction: column;
  padding: ${SIZES.XL}px;
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
`;
