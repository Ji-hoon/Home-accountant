import styled from "styled-components";
import { SIZES, COLORS } from "../../global/constants";
import { useRecoilState } from "recoil";
import { calculateElementPositionAndSize } from "../util/handleElement";
import { dropdownOpenAtom } from "../../atoms/globalAtoms";
import { useState } from "react";
import Dropdown from "../dropdown/Dropdown";
import Dropdown_Profile from "../dropdown/Dropdown.Profile";

export default function Profile({ url }: { url: string }) {
  const [showDropdown, setShowDropdown] = useRecoilState(dropdownOpenAtom);
  const [targetPosition, setTargetPosition] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  function handleProfileClick(e: React.SyntheticEvent) {
    const targetPos = calculateElementPositionAndSize({
      target: e.currentTarget as HTMLElement,
    });
    setTargetPosition(targetPos);
    setShowDropdown(!showDropdown);
  }

  return (
    <>
      <ProfileContainer onClick={handleProfileClick}>
        <img src={url} />
      </ProfileContainer>
      {showDropdown && (
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
