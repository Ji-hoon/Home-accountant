import { useRecoilState } from "recoil";
import { navCursorPosAtom } from "../../atoms/globalAtoms";
import styled from "styled-components";
import { COLORS, SIZES } from "../../global/constants";
import { useEffect } from "react";

export default function Navigation_ListType_Cursor({
  $menu,
}: {
  $menu: HTMLAnchorElement | undefined;
}) {
  const [cursorPos, setCursorPos] = useRecoilState(navCursorPosAtom);

  const activeMenuPosition = $menu && $menu?.offsetLeft - 6;
  const activeMenuWidth = $menu?.offsetWidth;

  useEffect(() => {
    if ($menu && activeMenuPosition !== undefined) {
      setCursorPos(activeMenuPosition);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [$menu, activeMenuWidth, activeMenuPosition]);

  return (
    <NavigationCursorElement
      id="nav-tab-cursor"
      $width={activeMenuWidth}
      $pos={cursorPos}
    />
  );
}

// eslint-disable-next-line react-refresh/only-export-components
const NavigationCursorElement = styled.div<{
  $width: number | undefined;
  $pos: number;
}>`
  display: none;

  @media screen and (max-width: ${SIZES.MEDIA_QUERY_BP_MEDIUM}px) {
    position: absolute;
    pointer-events: none;
    z-index: -1;
    background-color: ${COLORS.BRAND_LIGHT};
    top: 6px;
    left: 6px;
    width: ${(props) =>
      props.$width !== undefined ? `${props.$width}px` : "calc(50% - 11px)"};
    height: calc(100% - 12px);
    border-radius: 30px;
    display: block;

    -webkit-box-shadow: 0 1px 2px -2px ${COLORS.GRAY_09_OVERAY};
    box-shadow: 0 1px 2px -2px ${COLORS.GRAY_09_OVERAY};

    -webkit-transform: translateX(${(props) => props.$pos}px);
    transform: translateX(${(props) => props.$pos}px);

    -webkit-transition: transform 175ms 50ms
      cubic-bezier(0.44, 0.13, 0.37, 1.07);
    transition: transform 175ms 50ms cubic-bezier(0.44, 0.13, 0.37, 1.07);
  }
`;
