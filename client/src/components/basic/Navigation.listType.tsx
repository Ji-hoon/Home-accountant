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

  & a.active {
    background-color: ${COLORS.BRAND_LIGHT};
  }
`;
