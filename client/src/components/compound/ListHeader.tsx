import styled from "styled-components";
import { SIZES, COLORS } from "../../global/constants";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import Button_Icontype from "../basic/Button.iconType";
import { useExpenses } from "../../pages/Main/subpages/Expenses.hooks";

export default function ListHeader({
  $title,
  $type,
  $owner,
}: {
  $title: string;
  $type: string;
  $owner: string;
}) {
  const { pages } = useExpenses({ owner: $owner });
  const amounts = pages[0]?.amounts;

  return (
    <ListHeaderContainer $type={$type} $data={amounts}>
      <div className="header-navigation-container">
        <Button_Icontype>
          <FiChevronLeft strokeWidth="3" />
        </Button_Icontype>
        {$title}
        <Button_Icontype>
          <FiChevronRight strokeWidth="3" />
        </Button_Icontype>
      </div>
      <div className="header-value-container">{amounts.toLocaleString()}원</div>
    </ListHeaderContainer>
  );
}

const ListHeaderContainer = styled.div<{
  $type: string;
  $data: number;
}>`
  display: flex;
  justify-content: space-between;
  position: sticky;
  top: 80px;
  align-items: center;

  padding: ${SIZES.XS * 2}px ${SIZES.SM}px ${SIZES.XS}px;
  background-color: ${COLORS.BASIC_WHITE};

  font-size: ${SIZES.XL}px;
  line-height: ${SIZES.XXL}px;
  font-weight: bold;

  & .header-navigation-container {
    display: flex;
    gap: ${SIZES.XS / 2}px;
    align-items: center;
    margin-left: -${SIZES.XS / 2}px;

    & button {
      padding: ${SIZES.LG / 2}px;
    }
  }

  & .header-value-container {
    color: ${COLORS.BRAND_DEEP};

    &:before {
      content: ${(props) =>
        props.$type === "EXPENSES" && props.$data !== 0 ? '"-"' : '""'};
    }
  }
`;
