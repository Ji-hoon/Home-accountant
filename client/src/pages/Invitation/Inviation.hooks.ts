import { useSuspenseQuery } from "@tanstack/react-query";
import invitationAPI from "./Invitation.api";
import { queryKeys } from "../../global/reactQuery";

export function useInvitation(code: string) {
  const results = useSuspenseQuery({
    queryKey: [queryKeys.currentGroup],
    queryFn: () => invitationAPI.getGroupInfo(code),
  });

  return { results };
}
