import { useAssets } from "./Assets.hooks";
import { useRecoilValue } from "recoil";
import { currentUserAtom } from "../../../../atoms/globalAtoms";
import { Loader } from "rsuite";
import { ValueWrapper } from "../Expenses/Expenses.amounts";

export default function Assets_Amounts({
  $currentDate,
  $unit,
  $owner,
}: {
  $currentDate: Date;
  $unit: string;
  $owner: string;
}) {
  const currentUser = useRecoilValue(currentUserAtom);
  // 추후 useAssets 커스텀훅을 사용하도록 처리 필요
  const { data, fetchStatus } = useAssets({
    owner: $owner,
    currentGroupId: currentUser.currentGroup,
    currentDate: $currentDate,
    unit: $unit,
  });
  const amounts = data.amounts;

  return (
    <ValueWrapper>
      {fetchStatus === "fetching" && <Loader />}
      <span title="assets-amounts">{amounts.toLocaleString()}원</span>
    </ValueWrapper>
  );
}
