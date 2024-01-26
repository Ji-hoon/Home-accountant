import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { COLORS, LABELS, SIZES } from "../../global/constants";
import Button_Boxtype from "../basic/Button.boxType";
import { selectedExpenseIdAtom } from "../../atoms/globalAtoms";
import Input_Checkbox from "../basic/Input.checkbox";

export default function ListActionBar() {
  const selectedExpenseId = useRecoilValue(selectedExpenseIdAtom);

  return (
    <ActionBarContainer
      $showBottomBar={selectedExpenseId.length > 0 ? true : false}
      $selectedNum={selectedExpenseId.length}
    >
      <div className="bar-info">
        <Input_Checkbox $default={true} />
        <span>
          <strong>{selectedExpenseId.length}</strong>개의 지출내역
        </span>
      </div>
      <div className="button-group">
        <Button_Boxtype
          type="edit"
          disabled={selectedExpenseId.length > 1 ? true : false}
          onClick={() => {}}
        >
          {LABELS.LABEL_EDIT_EXPENSE}
        </Button_Boxtype>
        <Button_Boxtype type="delete" onClick={() => {}}>
          {LABELS.LABEL_DELETE}
        </Button_Boxtype>
      </div>
    </ActionBarContainer>
  );
}

const ActionBarContainer = styled.div<{
  $showBottomBar: boolean;
  $selectedNum: number;
}>`
  display: flex;
  position: sticky;
  height: 84px;
  padding: ${SIZES.XXS}px ${SIZES.XS}px ${SIZES.XL}px ${SIZES.SM}px;
  align-items: center;
  background-color: ${COLORS.BASIC_WHITE};
  z-index: 1;

  transition: all 150ms ease-out;
  transform: ${(props) =>
    props.$showBottomBar ? "translateY(0)" : "translateY(84px)"};

  top: calc(100vh - 84px);
  /* top: ${(props) =>
    props.$showBottomBar ? "calc(100vh - 84px)" : "100vh"}; */
  opacity: ${(props) => (props.$showBottomBar ? 1 : 0)};

  & .bar-info {
    display: flex;
    flex-grow: 1;
    gap: ${SIZES.SM / 4}px;
    align-items: flex-end;
  }

  & .button-group {
    display: flex;
    gap: ${SIZES.SM / 2}px;

    & button.delete {
      background-color: ${COLORS.VARIATION_RED};
      color: ${COLORS.BASIC_WHITE};
    }
  }
`;
