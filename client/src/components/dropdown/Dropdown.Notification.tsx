import { MenuGroup_ListType } from "../compound/MenuGroup.listType";
import { DropdownProps } from "../../global/customType";
import { LABELS, SIZES } from "../../global/constants";
import { DropdownUIContainerStyle } from "./Dropdown";
import styled from "styled-components";
import Empty from "../common/Empty";
import { FiBell } from "react-icons/fi";

export default function Dropdown_Notification({ data }: DropdownProps) {
  return (
    <DropdownNotificationUIContainer data={data}>
      <MenuGroup_ListType title={LABELS.LABEL_NOTIFICATION}>
        <li>
          <Empty
            className="empty"
            icon={<FiBell />}
            message={LABELS.MESSAGE_NO_NOTIFICATIONS}
          />
        </li>
      </MenuGroup_ListType>
    </DropdownNotificationUIContainer>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
const DropdownNotificationUIContainer = styled(DropdownUIContainerStyle)<{
  data: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  direction?: string;
}>`
  width: 260px;
  left: ${(props) => props.data.x + props.data.width - 260}px;

  & .empty {
    padding: ${SIZES.XL * 2}px;
  }
`;
