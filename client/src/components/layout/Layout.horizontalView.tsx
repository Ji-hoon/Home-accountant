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
    max-width: ${SIZES.MAX_WIDTH / 2}px;
    margin: 0 auto;

    & ul {
      margin: -${SIZES.LG * 3}px 0 0;
      padding: 0 0 ${SIZES.XL * 3}px;
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: ${SIZES.XXS / 3}px;
    }

    & .floating-button {
      position: sticky;
      top: calc(100vh - 80px);
      left: 100%;
    }
  }

  & .advertise-container {
    padding: ${SIZES.LG}px ${SIZES.XL}px ${SIZES.XL * 3}px;

    & img {
      width: 160px;
      border: 1px solid ${COLORS.GRAY_01};
      position: sticky;
      top: 100px;
      @media screen and (max-width: 900px) {
        display: none;
      }
    }
  }
`;
