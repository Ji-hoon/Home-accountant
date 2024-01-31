import { useExpenses } from "../Expenses/Expenses.hooks";
import { useRecoilValue } from "recoil";
import { currentUserAtom } from "../../../../atoms/globalAtoms";
import { Loader } from "rsuite";
import styled from "styled-components";
import { SIZES, COLORS } from "../../../../global/constants";

// eslint-disable-next-line react-refresh/only-export-components
export default function Expenses_Amounts({
  $currentDate,
  $unit,
  $owner,
}: {
  $currentDate: Date;
  $unit: string;
  $owner: string;
}) {
  const currentUser = useRecoilValue(currentUserAtom);
  const { pages, fetchStatus } = useExpenses({
    owner: $owner,
    currentGroupId: currentUser.currentGroup,
    currentDate: $currentDate,
    unit: $unit,
  });
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
