import styled from "styled-components";
import { SIZES } from "../../global/constants";
import { useRecoilValue } from "recoil";
import { selectedExpenseIdAtom } from "../../atoms/globalAtoms";

export default function Layout_HorizontalView({
  children,
}: {
  children?: JSX.Element;
}) {
  const selectedExpenseId = useRecoilValue(selectedExpenseIdAtom);
  return (
    <HorizontalViewContainer
      $showBottomBar={selectedExpenseId.length > 0 ? true : false}
    >
      {children}
    </HorizontalViewContainer>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
const HorizontalViewContainer = styled.section<{
  $showBottomBar: boolean;
}>`
  display: flex;
  max-width: ${SIZES.MAX_WIDTH}px;
  margin: 0 auto;

  & .aside-navigation-container {
    min-width: 240px;

    & nav {
      position: sticky;
      top: 80px;
      padding-right: ${SIZES.MD}px;
    }
  }

  & .list-container {
    flex-grow: 1;
    text-align: left;
    max-width: ${SIZES.MAX_WIDTH / 2}px;
    margin: 0 auto;

    & > ul,
    & section {
      min-height: calc(100vh - 162px);
      margin: -${SIZES.LG * 3}px 0 0;
      padding: 0 0 ${SIZES.XL * 3}px;
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: ${SIZES.XXS / 3}px;
    }

    & .floating-button {
      position: sticky;
      top: ${(props) =>
        props.$showBottomBar ? "100vh" : "calc(100vh - 80px)"};
      left: 100%;
    }
  }

  & .advertise-container {
    padding: ${SIZES.LG}px ${SIZES.MD}px ${SIZES.XL * 3}px;
  }
`;
