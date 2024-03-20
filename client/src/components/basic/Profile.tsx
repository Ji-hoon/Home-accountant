import styled from "styled-components";
import { SIZES, COLORS } from "../../global/constants";
import Dropdown from "../dropdown/Dropdown";
import Dropdown_Profile from "../dropdown/Dropdown.Profile";
import { useDropdown } from "../hooks/useDropdown";

export default function Profile({
  url,
  dropdownType,
  dropdownId,
}: {
  url: string;
  dropdownType?: string; //"DROPDOWN"
  dropdownId?: string;
}) {
  const {
    targetRef,
    showDropdown,
    targetPosition,
    handleDropdownTrigger,
    showDropdownUniqueKey,
  } = useDropdown({
    dropdownType,
    dropdownId,
  });

  return (
    <>
      <ProfileContainer
        className={showDropdown === showDropdownUniqueKey ? "active" : ""}
        ref={targetRef}
        onClick={handleDropdownTrigger}
      >
        <img src={url} />
      </ProfileContainer>
      {showDropdown === showDropdownUniqueKey && (
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

  &:hover,
  &.active {
    -webkit-box-shadow: 0 0 0 4px ${COLORS.GRAY_01_OVERAY};
    box-shadow: 0 0 0 4px ${COLORS.GRAY_01_OVERAY};
  }

  &:active,
  &.active {
    filter: brightness(0.92);
  }
`;
