import { useExpenses } from "../Expenses/Expenses.hooks";

export default function Assets_Amounts({
  $currentDate,
  $unit,
  $owner,
}: {
  $currentDate: Date;
  $unit: string;
  $owner: string;
}) {
  // 추후 useAssets 커스텀훅을 사용하도록 처리 필요
  const { pages } = useExpenses({
    owner: $owner,
    currentDate: $currentDate,
    unit: $unit,
  });
  const amounts = pages[0]?.amounts;
  console.log(amounts);

  return <>{0}원</>;
}
