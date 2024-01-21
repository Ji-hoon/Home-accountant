import styled from "styled-components";

import { SIZES, COLORS } from "../../global/constants";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import Button_Icontype from "../basic/Button.iconType";
import { useExpenses } from "../../pages/Main/subpages/Expenses/Expenses.hooks";
import { useHandleDate } from "../hooks/useHandleDate";
import { addDays, startOfWeek, format } from "date-fns";

export default function ListHeader({
  $currentDate,
  $unit,
  $type,
  $owner,
}: {
  $currentDate: Date;
  $unit: string;
  $type: string;
  $owner: string;
}) {
  //console.log("header: ", $currentDate);
  const { addMonth, subMonth, addWeek, subWeek } = useHandleDate();
  const { pages } = useExpenses({
    owner: $owner,
    currentDate: $currentDate,
    unit: $unit,
  });
  const amounts = pages[0]?.amounts;

  const startDay = startOfWeek($currentDate, { weekStartsOn: 1 });
  const getEndDay = addDays(startDay, 6);

  return (
    <ListHeaderContainer $type={$type} $data={amounts}>
      <div className="header-navigation-container">
        <Button_Icontype
          onClick={() => {
            $unit === "WEEK" ? subWeek() : subMonth();
          }}
        >
          <FiChevronLeft strokeWidth="3" />
        </Button_Icontype>
        <div>
          {$unit === "WEEK" &&
            `${format(startDay, `M월 d일`)} ~ ${format(getEndDay, `M월 d일`)}`}
          {$unit !== "WEEK" && format($currentDate, "yyyy년 M월")}
        </div>
        <Button_Icontype
          onClick={() => {
            $unit === "WEEK" ? addWeek() : addMonth();
          }}
        >
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
