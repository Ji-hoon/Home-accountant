import { useEffect } from "react";

import { FiAlertTriangle } from "react-icons/fi";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  currentUserAtom,
  selectedExpenseIdAtom,
} from "../../../../atoms/globalAtoms";
import { useGroups } from "./Group.hooks";
import { memberType } from "../../../../global/customType";
import ListItem_MemberType from "../../../../components/compound/ListItem.memberType";
import { LABELS } from "../../../../global/constants";
import Empty from "../../../../components/common/Empty";

export default function Group_Members() {
  const currentUser = useRecoilValue(currentUserAtom);
  const { data, fetchStatus } = useGroups(currentUser.currentGroup);
  const groupInfo = data.data?.groupInfo;

  const setSelectedExpenseId = useSetRecoilState(selectedExpenseIdAtom);
  useEffect(() => {
    setSelectedExpenseId([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className={fetchStatus === "fetching" ? "fetching" : ""}>
      {groupInfo &&
        groupInfo.members.length > 0 &&
        groupInfo.members.map((member: memberType, index: number) => (
          <ListItem_MemberType key={index} {...member} />
        ))}
      {groupInfo && groupInfo.members.length === 0 && (
        <Empty icon={<FiAlertTriangle />} message={LABELS.MESSAGE_NO_MEMBERS} />
      )}
    </section>
  );
}
