import styled from "styled-components";
import { SIZES, COLORS } from "../../global/constants";

export default function Layout_HorizontalView({
  children,
}: {
  children: JSX.Element;
}) {
  return <HorizontalViewContainer>{children}</HorizontalViewContainer>;
}

// eslint-disable-next-line react-refresh/only-export-components
const HorizontalViewContainer = styled.section`
  display: flex;
  max-width: ${SIZES.MAX_WIDTH}px;
  margin: 0 auto;

  & .aside-navigation-container {
    min-width: 240px;

    & nav {
      position: sticky;
      top: 80px;
    }
  }

  & .list-container {
    flex-grow: 1;
    text-align: left;
  }

  & .advertise-container {
    padding: ${SIZES.XL}px;

    & img {
      width: 160px;
      border: 1px solid ${COLORS.GRAY_01};
    }
  }
`;
