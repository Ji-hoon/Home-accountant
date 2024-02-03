import { throttle } from "lodash";
import { useState, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { dropdownOpenAtom } from "../../atoms/globalAtoms";
import { calculateElementPositionAndSize } from "../util/handleElement";
import { TYPES } from "../../global/constants";

export function useDropdown({
  dropdownType,
  dropdownId,
}: {
  dropdownType?: string | undefined;
  dropdownId?: string | undefined;
}) {
  const [showDropdown, setShowDropdown] = useRecoilState(dropdownOpenAtom);
  const [targetPosition, setTargetPosition] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  /* resize 이벤트 발생 시 data props 갱신 */
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const targetRef = useRef(null);

  const showDropdownUniqueKey = `${TYPES.DROPDOWN_KEY_PROFILE}_${dropdownType}_${dropdownId}`;

  const handleResize = throttle(() => {
    setWindowWidth(window.innerWidth);
  }, 500);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      // cleanup
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  useEffect(() => {
    if (showDropdown && targetRef.current) {
      const targetPos = calculateElementPositionAndSize({
        target: targetRef.current as HTMLElement,
      });
      setTargetPosition(targetPos);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowWidth]);
  /* resize 이벤트 발생 시 data props 갱신 */

  function handleProfileClick(e: React.SyntheticEvent) {
    const targetPos = calculateElementPositionAndSize({
      target: e.currentTarget as HTMLElement,
    });
    setTargetPosition(targetPos);
    setShowDropdown(showDropdownUniqueKey);
  }

  return {
    targetRef,
    showDropdown,
    targetPosition,
    handleProfileClick,
    showDropdownUniqueKey,
  };
}
