import { useAssets } from "./Assets.hooks";
import { useRecoilValue } from "recoil";
import { currentUserAtom } from "../../../../atoms/globalAtoms";

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
  const { data } = useAssets({
    owner: $owner,
    currentGroupId: currentUser.currentGroup,
    currentDate: $currentDate,
    unit: $unit,
  });
  const amounts = data.amounts;

  return <>{amounts.toLocaleString()}원</>;
}
