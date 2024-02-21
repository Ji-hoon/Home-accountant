import { FiChevronDown } from "react-icons/fi";
import { BoxtypeButton } from "./Button.boxType";
import styled from "styled-components";
import { useDropdown } from "../hooks/useDropdown";
import { TYPES } from "../../global/constants";
import Dropdown from "../dropdown/Dropdown";
import Dropdown_Menus from "../dropdown/Dropdown.Menus";

export default function Button_Dropdowntype({
  onClick,
  disabled,
  isAlert,
  title,
  children,
  options,
  dropdownId,
  dropdownType,
}: {
  onClick?: (e: React.SyntheticEvent) => void;
  disabled?: boolean | undefined;
  isAlert?: string | undefined;
  title?: string | undefined;
  children: React.ReactElement | string | boolean;
  options?: {
    name: string;
    url: string;
  }[];
  dropdownId?: string;
  dropdownType?: string;
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
      <DropdownButton
        ref={targetRef}
        className={showDropdown === showDropdownUniqueKey ? "active" : ""}
        onClick={dropdownType ? handleDropdownTrigger : onClick}
        disabled={disabled}
        $alert={isAlert}
        id={title}
      >
        <span>{children}</span>
        <FiChevronDown strokeWidth="3" />
      </DropdownButton>
      {showDropdown === showDropdownUniqueKey &&
        dropdownType === TYPES.DROPDOWN_KEY_HEADER_NAV && (
          <Dropdown>
            <Dropdown_Menus data={targetPosition} options={options} />
          </Dropdown>
        )}
    </>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
const DropdownButton = styled(BoxtypeButton)`
  span {
    flex-grow: 1;
    text-align: left;
  }
`;
