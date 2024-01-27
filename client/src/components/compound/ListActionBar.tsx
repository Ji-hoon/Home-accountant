import styled from "styled-components";
import { useRecoilState } from "recoil";
import { COLORS, LABELS, SIZES } from "../../global/constants";
import Button_Boxtype from "../basic/Button.boxType";
import { selectedExpenseIdAtom } from "../../atoms/globalAtoms";
import Input_Checkbox from "../basic/Input.checkbox";
//import { useHandleDialog } from "../hooks/useHandleDialog";

export default function ListActionBar() {
  const [selectedExpenseId, setSelectedExpenseId] = useRecoilState(
    selectedExpenseIdAtom,
  );

  //const { showDialog } = useHandleDialog();

  function handleClick() {
    setSelectedExpenseId([]);
  }

  return (
    <ActionBarContainer
      $showBottomBar={selectedExpenseId.length > 0 ? true : false}
      $selectedNum={selectedExpenseId.length}
    >
      <div className="bar-info">
        <Input_Checkbox $default={true} onClick={handleClick} />
        <span>
          <strong>{selectedExpenseId.length}</strong>개가 선택됨
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
  box-shadow: 0 -6px 7px -10px ${COLORS.GRAY_08_OVERAY};
  border-top: 1px solid ${COLORS.GRAY_01_OVERAY};
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
    gap: ${SIZES.MD / 3}px;
    align-items: flex-end;

    & span {
      font-size: ${SIZES.MD}px;
      line-height: ${SIZES.MD}px;
    }
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
