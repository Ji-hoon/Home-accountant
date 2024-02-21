import styled from "styled-components";
import { SIZES } from "../../global/constants";
import { useRecoilValue } from "recoil";
import { selectedExpenseIdAtom } from "../../atoms/globalAtoms";
import { useRef } from "react";

export default function HorizontalViewLayout({
  children,
}: {
  children?: JSX.Element;
}) {
  const selectedExpenseId = useRecoilValue(selectedExpenseIdAtom);

  const navRef = useRef<HTMLDivElement>(null);
  const navLength =
    navRef.current?.getElementsByTagName("nav")[0]?.childNodes.length;

  return (
    <HorizontalViewContainer
      ref={navRef}
      autoFocus
      $showBottomBar={selectedExpenseId.length > 0 ? true : false}
      $navLength={navLength}
    >
      {children}
    </HorizontalViewContainer>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
const HorizontalViewContainer = styled.section<{
  $showBottomBar: boolean;
  $navLength: number | undefined;
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
      margin: -${SIZES.LG * 3 + 84}px 0 0;
      padding: 0 0 84px;
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: ${SIZES.XXS / 3}px;

      -webkit-transition: opacity 150ms ease-out;
      transition: opacity 150ms ease-out;

      & li.skeleton-item {
        margin-bottom: -70px;
      }

      &.fetching {
        opacity: 0.3;
        pointer-events: none;
      }
    }

    & button + section {
      // chart section
      margin-top: -${SIZES.LG * 3}px;
    }

    & .floating-button {
      position: sticky;
      top: calc(100% - 80px);
      /* top: ${(props) =>
        props.$showBottomBar ? "100vh" : "calc(100vh - 80px)"};*/
      left: 100%;
      opacity: ${(props) => (props.$showBottomBar ? 0 : 1)};
    }
  }

  & .advertise-container {
    padding: ${SIZES.LG}px ${SIZES.MD}px ${SIZES.XL * 3}px;
  }

  @media screen and (max-width: ${SIZES.MEDIA_QUERY_BP_LARGE}px) {
    .aside-navigation-container {
      min-width: 160px;

      nav {
        padding-right: 12px;
      }
    }
    .advertise-container {
      padding-left: 8px;
      padding-right: 8px;
    }
  }

  @media screen and (max-width: ${SIZES.MEDIA_QUERY_BP_MEDIUM}px) {
    flex-direction: column;

    .aside-navigation-container {
      nav {
        flex-direction: row;
        justify-content: center;
        padding: 20px 20px 8px;
        display: ${(props) => (props.$navLength === 1 ? "none" : "flex")};

        button {
          border-radius: 40px;
          padding: 12px 20px;
        }
      }
    }

    .list-container {
      width: 100%;

      .floating-button {
        left: calc(100% - 80px);
      }

      &.assets section {
        margin: -60px 20px 0;
        width: auto;
      }
    }

    .advertise-container {
      display: none;
    }
  }

  @media screen and (max-width: ${SIZES.MEDIA_QUERY_BP_SMALL}px) {
    .list-container > ul#expenses {
      min-height: calc(100vh - 210px);
    }

    .aside-navigation-container {
      nav {
        padding-top: 16px;
      }
    }
  }
`;
