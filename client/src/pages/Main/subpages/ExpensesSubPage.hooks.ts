import { useSuspenseQuery } from "@tanstack/react-query";
import groupsAPI from "./Group/Group.api";
import { queryKeys } from "../../../global/reactQuery";

export function useExpensesSubPage(currentGroupId: string) {
  const results = useSuspenseQuery({
    queryKey: [queryKeys.currentGroup],
    queryFn: () => groupsAPI.get(currentGroupId),
  });
  const members = results.data.data.groupInfo.members;
  const categories = results.data.data.groupInfo.categories;

  return { members, categories };
}
