/* eslint-disable react-refresh/only-export-components */
import styled from "styled-components";
import { ListItemContainer } from "../compound/ListItem.expenseType";
import { SIZES, COLORS } from "../../global/constants";

export default function Skeleton_ExpenseListItem() {
  return (
    <DummyListContainer>
      <div></div>
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

  & div:nth-child(1) {
    width: ${SIZES.LG}px;
    height: ${SIZES.LG}px;
    background-color: ${COLORS.GRAY_01_OVERAY};
    border-radius: 4px;
    -webkit-animation: blink 1.5s 50ms ease-in infinite;
    animation: blink 1.5s 50ms ease-in infinite;
  }
  & h4 {
    height: ${SIZES.LG}px;
    font-size: 0;
    background-color: ${COLORS.GRAY_01_OVERAY};
    border-radius: 4px;
    width: 200px;
    -webkit-animation: blink 1.5s 200ms infinite;
    animation: blink 1.5s 200ms infinite;
  }

  & p {
    height: ${SIZES.SM}px;
    font-size: 0;
    background-color: ${COLORS.GRAY_01_OVERAY};
    border-radius: 4px;
    width: 100px;
    -webkit-animation: blink 1.5s 100ms ease-in infinite;
    animation: blink 1.5s 100ms ease-in infinite;
  }

  & .expense-value {
    & h4 {
      width: 120px;
    }
    & p {
      width: 80px;
    }
  }

  @keyframes blink {
    0% {
      opacity: 0.45;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.45;
    }
  }

  @media screen and (max-width: ${SIZES.MEDIA_QUERY_BP_MEDIUM}px) {
    h4 {
      width: 120px;
    }
    p {
      width: 60px;
    }

    & .expense-value {
      & h4 {
        width: 100px;
      }
      & p {
        width: 60px;
      }
    }
  }
`;
