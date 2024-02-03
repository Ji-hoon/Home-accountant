import styled from "styled-components";
import { COLORS, SIZES, TYPES } from "../../global/constants";
import Dropdown from "../dropdown/Dropdown";
import Dropdown_Member from "../dropdown/Dropdown.Member";
import { useDropdown } from "../hooks/useDropdown";
// import { useEffect, useRef, useState } from "react";
// import { calculateElementPositionAndSize } from "../util/handleElement";
// import { throttle } from "lodash";
// import { useRecoilState } from "recoil";
// import { dropdownOpenAtom } from "../../atoms/globalAtoms";

export default function Button_Icontype({
  children,
  onClick,
  dropdownId,
  dropdownType,
}: {
  children: React.ReactElement | string;
  onClick?: (e: React.SyntheticEvent) => void;
  dropdownId?: string;
  dropdownType?: string;
}) {
  // const [showDropdown, setShowDropdown] = useRecoilState(dropdownOpenAtom);
  // const [targetPosition, setTargetPosition] = useState({
  //   x: 0,
  //   y: 0,
  //   width: 0,
  //   height: 0,
  // });
  // const buttonRef = useRef(null);

  // function handleProfileClick(e: React.SyntheticEvent) {
  //   const targetPos = calculateElementPositionAndSize({
  //     target: e.currentTarget as HTMLElement,
  //   });
  //   setTargetPosition(targetPos);
  //   setShowDropdown(`${TYPES.DROPDOWN_KEY_MEMBER}_${type}_${id}`);
  // }

  // /* resize 이벤트 발생 시 data props 갱신 */
  // const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // const handleResize = throttle(() => {
  //   setWindowWidth(window.innerWidth);
  // }, 500);

  // useEffect(() => {
  //   window.addEventListener("resize", handleResize);
  //   return () => {
  //     // cleanup
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, [handleResize]);

  // useEffect(() => {
  //   if (showDropdown && buttonRef.current) {
  //     const targetPos = calculateElementPositionAndSize({
  //       target: buttonRef.current as HTMLElement,
  //     });
  //     setTargetPosition(targetPos);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [windowWidth]);
  // /* resize 이벤트 발생 시 data props 갱신 */

  // onClick={handleProfileClick}

  const {
    targetRef,
    showDropdown,
    targetPosition,
    handleProfileClick,
    showDropdownUniqueKey,
  } = useDropdown({
    dropdownType,
    dropdownId,
  });

  return (
    <>
      <IcontypeButton
        ref={targetRef}
        className={showDropdown === showDropdownUniqueKey ? "active" : ""}
        onClick={dropdownType === TYPES.MEMBER ? handleProfileClick : onClick}
      >
        {children}
      </IcontypeButton>
      {showDropdown === showDropdownUniqueKey && (
        <Dropdown>
          <Dropdown_Member data={targetPosition} />
        </Dropdown>
      )}
    </>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
const IcontypeButton = styled.button`
  border: none;
  border-radius: 5px;
  outline: none;
  padding: ${SIZES.XXS}px ${SIZES.XS}px;
  font-size: ${SIZES.SM}px;
  line-height: ${SIZES.LG}px;
  font-weight: 700;
  background-color: transparent;
  color: ${COLORS.GRAY_10};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${SIZES.SM / 2}px;
  -webkit-transition: all 200ms ease-out;
  transition: all 200ms ease-out;

  & svg {
    width: ${SIZES.LG}px;
    height: ${SIZES.LG}px;
  }

  &:hover {
    background-color: ${COLORS.GRAY_01_OVERAY};
  }

  &:active,
  &.active {
    background-color: ${COLORS.GRAY_02_OVERAY};
  }
`;
