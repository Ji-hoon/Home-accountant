import styled from "styled-components";

import { SIZES, COLORS } from "../../global/constants";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import Button_Icontype from "../basic/Button.iconType";
import { useExpenses } from "../../pages/Main/subpages/Expenses/Expenses.hooks";
import { useHandleDate } from "../hooks/useHandleDate";
import { addDays, startOfWeek, format } from "date-fns";

/* TODO:
 * [x]. ListHeader에서 사용하는 전역 상태인 currentDate를 set. (디폴트 값에 date 활용한 formatted string 할당)
 * [x]. Expenses_subpage에서 set한 value를 가져옴 => date 변경 시 리렌더링.
 * [x]. 아이콘 타입 버튼에 클릭 이벤트 핸들러 할당. 오른쪽 클릭 시 1달 더하기
 * [x]. 왼쪽 클릭 시 1달 빼기. => 커스텀훅으로 구현
 * [ ]. 주간 지출 내역 메뉴 추가 (주간 > 월간 > 멤버별)
 * [ ]. useExpense fetch 파라미터에 period 추가 (API도 반영)
 */

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
  const { addMonth, subMonth, addWeek, subWeek } = useHandleDate();
  const { pages } = useExpenses({ owner: $owner });
  const amounts = pages[0]?.amounts;

  const startDay = startOfWeek($currentDate, { weekStartsOn: 1 });
  const getEndDay = addDays(startDay, 6);

  return (
    <ListHeaderContainer $type={$type} $data={amounts}>
      <div className="header-navigation-container">
        <Button_Icontype
          onClick={() => {
            if ($unit === "WEEK") subWeek();
            else subMonth();
          }}
        >
          <FiChevronLeft strokeWidth="3" />
        </Button_Icontype>
        <>
          {$unit === "WEEK" &&
            `${format(startDay, `M월 d일`)} ~ ${format(getEndDay, `M월 d일`)}`}
          {$unit === "MONTH" && format($currentDate, "yyyy년 M월")}
        </>
        <Button_Icontype
          onClick={() => {
            if ($unit === "WEEK") addWeek();
            else addMonth();
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
