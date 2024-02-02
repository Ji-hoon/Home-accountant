import styled from "styled-components";
import { SIZES, COLORS, TYPES } from "../../global/constants";
import { useRecoilState } from "recoil";
import { calculateElementPositionAndSize } from "../util/handleElement";
import { dropdownOpenAtom } from "../../atoms/globalAtoms";
import { useEffect, useRef, useState } from "react";
import Dropdown from "../dropdown/Dropdown";
import Dropdown_Profile from "../dropdown/Dropdown.Profile";
import { throttle } from "lodash";

export default function Profile({
  url,
  type,
}: {
  url: string;
  type?: string; //"DROPDOWN"
}) {
  const [showDropdown, setShowDropdown] = useRecoilState(dropdownOpenAtom);
  const [targetPosition, setTargetPosition] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const profileRef = useRef(null);

  function handleProfileClick(e: React.SyntheticEvent) {
    const targetPos = calculateElementPositionAndSize({
      target: e.currentTarget as HTMLElement,
    });
    setTargetPosition(targetPos);
    setShowDropdown(!showDropdown);
  }

  /* resize 이벤트 발생 시 data props 갱신 */
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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
    if (showDropdown && profileRef.current) {
      const targetPos = calculateElementPositionAndSize({
        target: profileRef.current as HTMLElement,
      });
      setTargetPosition(targetPos);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowWidth]);
  /* resize 이벤트 발생 시 data props 갱신 */

  return (
    <>
      <ProfileContainer ref={profileRef} onClick={handleProfileClick}>
        <img src={url} />
      </ProfileContainer>
      {showDropdown && type === TYPES.PROFILE_TYPE_DROPDOWN && (
        <Dropdown>
          <Dropdown_Profile data={targetPosition} />
        </Dropdown>
      )}
    </>
  );
}

const ProfileContainer = styled.div`
  width: ${SIZES.XL * 2}px;
  height: ${SIZES.XL * 2}px;
  border-radius: ${SIZES.XL * 2}px;
  overflow: hidden;
  cursor: pointer;

  -webkit-transition: all 200ms ease-out;
  transition: all 200ms ease-out;

  box-shadow: 0 0 0 1px ${COLORS.GRAY_01_OVERAY};

  & img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  &:hover {
    -webkit-box-shadow: 0 0 0 4px ${COLORS.GRAY_01_OVERAY};
    box-shadow: 0 0 0 4px ${COLORS.GRAY_01_OVERAY};
  }

  &:active {
    filter: brightness(0.95);
  }
`;
