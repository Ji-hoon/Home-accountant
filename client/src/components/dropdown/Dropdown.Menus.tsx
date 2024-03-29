import { MenuGroup_ListType } from "../compound/MenuGroup.listType";
import Button_Boxtype from "../basic/Button.boxType";
import { DropdownProps } from "../../global/customType";
import { DropdownUIContainerStyle } from "./Dropdown";
import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { dropdownOpenAtom } from "../../atoms/globalAtoms";
import { COLORS, LABELS } from "../../global/constants";
import { FiCheck } from "react-icons/fi";

export default function Dropdown_Menus({
  data,
  options,
}: {
  data: DropdownProps["data"];
  options:
    | {
        name: string;
        url: string;
      }[]
    | undefined;
}) {
  const location = useLocation();
  const setShowDropdown = useSetRecoilState(dropdownOpenAtom);
  const ismobile = /iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent);
  return (
    <DropdownUIContainerStyleLeftTop
      data={data}
      className={ismobile ? "mobile" : ""}
    >
      <MenuGroup_ListType title={LABELS.MOBILE_MENU_LABEL_MAIN}>
        {options &&
          options.map((option, index) => (
            <NavLink
              onClick={() => setShowDropdown("")}
              className={location.pathname.includes(option.url) ? "active" : ""}
              to={option.url}
              key={index}
            >
              <Button_Boxtype>
                <>
                  <span>{option.name}</span>
                  {location.pathname.includes(option.url) && (
                    <FiCheck strokeWidth={4} />
                  )}
                </>
              </Button_Boxtype>
            </NavLink>
          ))}
      </MenuGroup_ListType>
    </DropdownUIContainerStyleLeftTop>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
const DropdownUIContainerStyleLeftTop = styled(DropdownUIContainerStyle)`
  left: ${(props) => props.data.x}px;
  min-width: ${(props) => props.data.width}px;
  width: auto;

  & a.active button {
    color: ${COLORS.BRAND_DEEP};
  }
`;
