import { MenuGroup_ListType } from "../compound/MenuGroup.listType";
import { DropdownProps } from "../../global/customType";
import { LABELS, SIZES } from "../../global/constants";
import { DropdownUIContainerStyle } from "./Dropdown";
import styled from "styled-components";
import Empty from "../common/Empty";
import { FiBell } from "react-icons/fi";

export default function Dropdown_Notification({ data }: DropdownProps) {
  const ismobile = /iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent);

  return (
    <DropdownNotificationUIContainer
      data={data}
      ismobile={ismobile}
      className={ismobile ? "mobile" : ""}
    >
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
  ismobile?: boolean;
}>`
  width: ${(props) => (!props.ismobile ? "260px" : "100%")};
  left: ${(props) => props.data.x + props.data.width - 260}px;

  & .empty {
    padding: ${SIZES.XL * 2}px;
  }
`;
