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

  & .aside-navigation-container {
    position: fixed;
    top: 80px;
    min-width: 240px;
  }

  & .list-container {
    padding-left: 240px;
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
