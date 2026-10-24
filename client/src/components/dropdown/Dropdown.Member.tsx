import { MenuGroup_ListType } from "../compound/MenuGroup.listType";
import Button_Boxtype from "../basic/Button.boxType";
import { DropdownProps } from "../../global/customType";
import { LABELS } from "../../global/constants";
import { DropdownUIContainerStyle } from "./Dropdown";
import { useSetRecoilState } from "recoil";
import { dropdownOpenAtom } from "../../atoms/globalAtoms";

export default function Dropdown_Member({ data }: DropdownProps) {
  const ismobile = /iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent);

  const setShowDropdown = useSetRecoilState(dropdownOpenAtom);

  return (
    <DropdownUIContainerStyle data={data} className={ismobile ? "mobile" : ""}>
      <MenuGroup_ListType title={LABELS.MOBILE_MENU_LABEL_MEMBER}>
        <li>
          <Button_Boxtype onClick={() => setShowDropdown("")}>
            {LABELS.LABEL_WITHDRAW_MEMBER}
          </Button_Boxtype>
        </li>
      </MenuGroup_ListType>
    </DropdownUIContainerStyle>
  );
}
