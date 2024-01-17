import styled from "styled-components";
import { SIZES, COLORS } from "../../global/constants";

export default function ListItem_ExpenseType({
  $item,
}: {
  $item: {
    businessName: string;
    amounts: number;
    date: string;
    category: string;
    owner: string;
  };
}) {
  return (
    <li>
      <ListItemContainer>
        <input type="checkbox" />
        <div className="expense-info">
          <h4>{$item.businessName}</h4>
          <p>{$item.date}</p>
        </div>
        <div className="expense-value">
          <p>{$item.owner}</p>
          <h4>{$item.amounts.toLocaleString()}원</h4>
        </div>
      </ListItemContainer>
    </li>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
const ListItemContainer = styled.div`
  display: flex;
  gap: ${SIZES.XS / 2}px;
  padding: ${SIZES.SM}px ${SIZES.SM}px;
  border-top: 1px solid ${COLORS.GRAY_01_OVERAY};
  align-items: flex-start;

  & input[type="checkbox"] {
    width: ${SIZES.XS}px;
    height: ${SIZES.XS}px;
    margin-top: ${SIZES.XXS / 3}px;
    cursor: pointer;
  }

  & .expense-info {
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
    gap: ${SIZES.XXS / 2}px;
  }

  & h4 {
    margin: 0;
    font-size: ${SIZES.MD}px;
    color: ${COLORS.GRAY_10};
  }

  & p {
    margin: 0;
    color: ${COLORS.GRAY_04};
  }
`;
