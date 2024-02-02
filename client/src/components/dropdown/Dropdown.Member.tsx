import styled from "styled-components";
import { MenuGroup_ListType } from "../compound/MenuGroup.listType";
import Button_Boxtype from "../basic/Button.boxType";
import { DropdownProps } from "../../global/customType";
import { LABELS, COLORS, SIZES } from "../../global/constants";

export default function Dropdown_Member({ data }: DropdownProps) {
  return (
    <DropdownMemberContainer data={data}>
      <MenuGroup_ListType>
        <li>
          <Button_Boxtype>{LABELS.LABEL_WITHDRAW_MEMBER}</Button_Boxtype>
        </li>
      </MenuGroup_ListType>
    </DropdownMemberContainer>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
const DropdownMemberContainer = styled.div<{
  data: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}>`
  position: absolute;
  left: ${(props) => props.data.x + props.data.width - 200}px;
  top: ${(props) => props.data.y + props.data.height}px;
  height: auto;
  width: 200px;
  max-height: calc(100vh - 100px);

  overflow-x: hidden;
  overflow-y: auto;

  margin-top: 6px;
  background-color: #fff;
  border-radius: 5px;
  background-color: ${COLORS.BASIC_WHITE};
  box-shadow: 0 2px 7px 0 ${COLORS.GRAY_07_OVERAY};
  max-width: ${SIZES.MAX_WIDTH * 0.65}px;
`;
