import styled from "styled-components";
import { COLORS, LABELS, SIZES } from "../../global/constants";
import { MenuGroup_ListType } from "../compound/MenuGroup.listType";
import Button_Boxtype from "../basic/Button.boxType";
import { useDropdownProfile } from "./Dropdown.Profile.hooks";
import { currentUserAtom } from "../../atoms/globalAtoms";
import { useRecoilValue } from "recoil";
import ApiBoundary from "../../global/ApiBoundary";
import { format } from "date-fns";
import { groupListInfoType } from "../../global/customType";
import { FiCheck } from "react-icons/fi";

type Props = {
  data: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
};
// eslint-disable-next-line react-refresh/only-export-components
export default function Dropdown_Profile(props: Props) {
  return (
    <ApiBoundary>
      <ApiComponent {...props} />
    </ApiBoundary>
  );
}

export function ApiComponent({ data }: Props) {
  const currentUser = useRecoilValue(currentUserAtom);
  const { result } = useDropdownProfile(currentUser.userId);

  const groupList = result.data.data.groups;

  return (
    <DropdownProfileContainer data={data}>
      <MenuGroup_ListType title={LABELS.LABEL_GROUP}>
        {groupList &&
          groupList.map((group: groupListInfoType, index: number) => (
            <li key={index}>
              <Button_Boxtype>
                <p>
                  <strong
                    className={
                      currentUser.currentGroup === group._id ? "active" : ""
                    }
                  >
                    {group.name}
                    {currentUser.currentGroup === group._id && (
                      <FiCheck strokeWidth={3} />
                    )}
                  </strong>
                  <span>
                    {format(group.createdAt, "yyyy년 M월 d일")}에 생성됨
                  </span>
                </p>
              </Button_Boxtype>
            </li>
          ))}
      </MenuGroup_ListType>
      <MenuGroup_ListType title={LABELS.LABEL_ACCOUNT}>
        <li>
          <Button_Boxtype>{LABELS.LABEL_ACCOUNT_INFO}</Button_Boxtype>
        </li>
        <li>
          <Button_Boxtype>{LABELS.LABEL_LOGOUT}</Button_Boxtype>
        </li>
      </MenuGroup_ListType>
    </DropdownProfileContainer>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
const DropdownProfileContainer = styled.div<{
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
