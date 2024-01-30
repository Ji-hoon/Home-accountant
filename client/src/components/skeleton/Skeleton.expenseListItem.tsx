/* eslint-disable react-refresh/only-export-components */
import styled from "styled-components";
import { ListItemContainer } from "../compound/ListItem.expenseType";
import { SIZES, COLORS } from "../../global/constants";

export default function Skeleton_ExpenseListItem() {
  return (
    <DummyListContainer>
      <DummyCheckbox />
      <div className="list-info">
        <h4 className="businessName">업장명슬롯</h4>
        <p className="date">날짜슬롯</p>
      </div>
      <div className="expense-value">
        <p className="owner">멤버 슬롯</p>
        <h4 className="amounts">금액 슬롯</h4>
      </div>
    </DummyListContainer>
  );
}

const DummyListContainer = styled(ListItemContainer)`
  //pointer-events: none;

  & h4 {
    height: ${SIZES.LG}px;
    font-size: 0;
    background-color: ${COLORS.GRAY_01_OVERAY};
    border-radius: 4px;
    width: 200px;
  }

  & p {
    height: ${SIZES.SM}px;
    font-size: 0;
    background-color: ${COLORS.GRAY_01_OVERAY};
    border-radius: 4px;
    width: 100px;
  }

  & .expense-value {
    & h4 {
      width: 120px;
    }
    & p {
      width: 80px;
    }
  }
`;

const DummyCheckbox = styled.div`
  width: ${SIZES.LG}px;
  height: ${SIZES.LG}px;
  background-color: ${COLORS.GRAY_01_OVERAY};
  border-radius: 4px;
`;
