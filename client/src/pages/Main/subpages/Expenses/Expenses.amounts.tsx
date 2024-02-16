import { useExpenses } from "../Expenses/Expenses.hooks";
import { Loader } from "rsuite";
import styled from "styled-components";
import { SIZES, COLORS } from "../../../../global/constants";

// eslint-disable-next-line react-refresh/only-export-components
export default function Expenses_Amounts() {
  const { pages, fetchStatus } = useExpenses();
  const amounts = pages[0]?.amounts;

  return (
    <ValueWrapper>
      {fetchStatus === "fetching" && <Loader size="sm" />}
      <span>-{amounts.toLocaleString()}원</span>
    </ValueWrapper>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const ValueWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  & .rs-loader-spin {
    width: ${SIZES.XL}px;
    height: ${SIZES.XL}px;

    &::before,
    &::after {
      width: inherit;
      height: inherit;
      border-color: ${COLORS.GRAY_01_OVERAY};
    }
    &:after {
      border-color: ${COLORS.GRAY_07_OVERAY} transparent transparent;
    }
  }
`;
