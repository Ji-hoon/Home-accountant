import styled from "styled-components";
import { SIZES, COLORS } from "../../global/constants";
import { ExpenseType } from "../../global/customType";
import { format } from "date-fns";
import Input_Checkbox from "../basic/Input.checkbox";

import { FiCoffee, FiInstagram } from "react-icons/fi";

// eslint-disable-next-line react-refresh/only-export-components
export default function ListItem_ExpenseType({
  $item,
  onClick,
}: {
  $item: ExpenseType & {
    _id: string;
  };
  onClick: (event: React.SyntheticEvent) => void;
}) {
  return (
    <li>
      <ListItemContainer
        id={$item._id}
        onClick={(event: React.SyntheticEvent) => onClick(event)}
      >
        <div>
          <Input_Checkbox $id={$item._id} />
        </div>
        <div className="list-info">
          <h4 className="businessName" id={$item.businessName}>
            {$item.businessName}
            <span className="category" id={$item.category}>
              {$item.category === "식비" && <FiCoffee />}
              {$item.category === "문화생활" && <FiInstagram />}
              {$item.category}
            </span>
          </h4>
          <p className="date" id={$item.date as unknown as string}>
            {format($item.date, "yyyy-MM-dd")}
          </p>
        </div>
        <div className="expense-value">
          <p className="owner" id={$item.owner}>
            {$item.owner}
          </p>
          <h4 className="amounts" id={$item.amounts}>
            {$item.amounts.toLocaleString()}원
          </h4>
        </div>
      </ListItemContainer>
    </li>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const ListItemContainer = styled.div`
  display: flex;
  gap: ${SIZES.XS / 2}px;
  padding: ${SIZES.SM}px ${SIZES.SM}px;
  align-items: flex-start;
  border-radius: ${SIZES.XXS / 2}px;
  -webkit-transition: all 200ms ease-out;
  transition: all 200ms ease-out;
  cursor: pointer;

  &:hover {
    background-color: ${COLORS.GRAY_01};
  }

  & input[type="checkbox"] {
    width: ${SIZES.XS}px;
    height: ${SIZES.XS}px;
    margin-top: ${SIZES.XXS / 3}px;
    cursor: pointer;
  }

  & .list-info {
    flex-grow: 1;
    text-align: left;
    display: flex;
    flex-direction: column;
    gap: ${SIZES.XXS / 2}px;
  }

  & .expense-value {
    text-align: right;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: ${SIZES.XXS / 2}px;

    & h4:before {
      content: "-";
    }
  }

  & h4 {
    margin: 0;
    font-size: ${SIZES.MD}px;
    color: ${COLORS.GRAY_10};
    display: flex;
    gap: ${SIZES.XS / 2}px;
    align-items: flex-start;

    & span {
      //TODO: 중복 사용 시 capsule label 컴포넌트로 구현 필요
      display: flex;
      align-items: center;
      gap: 3px;
      text-align: center;
      font-size: ${SIZES.XS}px;
      line-height: ${SIZES.MD}px;
      font-weight: 500;
      background-color: rgb(248 198 249 / 30%);
      color: #bb73bd; // ${COLORS.VARIATION_PINK};
      padding: 2px 8px;
      border-radius: 12px;

      &.role {
        background-color: rgb(179 203 252 / 30%); // ${COLORS.VARIATION_BLUE};
        color: #637eb7; // ${COLORS.VARIATION_BLUE};
      }
    }

    &.amounts {
      gap: 0;
    }
  }

  & p {
    margin: 0;
    color: ${COLORS.GRAY_04};
  }
`;
