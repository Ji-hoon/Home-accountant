import { useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../../global/reactQuery";
import groupsAPI from "./Group.api";

export function useGroups(currentGroupId: string) {
  const results = useSuspenseQuery({
    queryKey: [queryKeys.currentGroup],
    queryFn: () => groupsAPI.get(currentGroupId),
  });

  return { results };
}
