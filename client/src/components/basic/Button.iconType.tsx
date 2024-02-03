import styled from "styled-components";
import { COLORS, SIZES } from "../../global/constants";
import Dropdown from "../dropdown/Dropdown";
import Dropdown_Member from "../dropdown/Dropdown.Member";
import { useDropdown } from "../hooks/useDropdown";

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
        onClick={dropdownType ? handleProfileClick : onClick}
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
