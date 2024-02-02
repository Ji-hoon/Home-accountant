import { useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "../../global/reactQuery";
import profileAPI from "./Dropdown.Profile.api";

export function useDropdownProfile(userId: string) {
  const result = useSuspenseQuery({
    queryKey: [queryKeys.currentUser],
    queryFn: () => profileAPI.getGroupInfo(userId),
  });

  return { result };
}
