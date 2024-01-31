import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { queryClient, queryKeys } from "../../../../global/reactQuery";
import groupsAPI from "./Group.api";

export function useGroups(currentGroupId: string) {
  const results = useSuspenseQuery({
    queryKey: [queryKeys.currentGroup],
    queryFn: () => groupsAPI.get(currentGroupId),
  });

  const { data, refetch, fetchStatus } = results;

  const invalidateExpenseQuery = () => {
    queryClient.invalidateQueries({
      queryKey: [queryKeys.currentGroup],
    });
  };

  const updateGroup = useMutation({
    mutationFn: groupsAPI.update,
    onMutate: () => {
      //setisLoading(!isLoading);
    },
    onSuccess: (data) => {
      console.log(data.data.message);
      invalidateExpenseQuery();
      refetch();
    },
    onError: (err) => {
      console.log(err);
      // toast.error(
      //   err instanceof AxiosError ? err.response?.data.error : "unknown error",
      // );
    },
    onSettled: () => {
      //setisLoading(!isLoading);
    },
  }).mutateAsync;

  return { data, updateGroup, fetchStatus };
}
