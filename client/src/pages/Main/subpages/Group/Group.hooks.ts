import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { queryClient, queryKeys } from "../../../../global/reactQuery";
import groupsAPI from "./Group.api";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

export function useGroups(currentGroupId: string) {
  const results = useSuspenseQuery({
    queryKey: [queryKeys.currentGroup],
    queryFn: () => groupsAPI.get(currentGroupId),
  });

  const { data, refetch, fetchStatus } = results;

  const members = results.data.data.groupInfo.members;
  const categories = results.data.data.groupInfo.categories;
  const assetTypes = results.data.data.groupInfo.assetTypes; //TODO : api 구현 후 연결 필요

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
      toast.success(data.data.message);
      invalidateExpenseQuery();
      refetch();
    },
    onError: (err) => {
      console.log(err);
      toast.error(
        err instanceof AxiosError ? err.response?.data.error : "unknown error",
      );
    },
    onSettled: () => {
      //setisLoading(!isLoading);
    },
  }).mutateAsync;

  const inviteMemberToGroup = useMutation({
    mutationFn: groupsAPI.invite,
    onMutate: () => {
      //setisLoading(!isLoading);
    },
    onSuccess: (data) => {
      toast.success(data?.data.message);
      console.log(data);
    },
    onError: (err) => {
      console.log(err);
      toast.error(
        err instanceof AxiosError ? err.response?.data.error : "unknown error",
      );
    },
    onSettled: () => {
      //setisLoading(!isLoading);
    },
  }).mutateAsync;

  return {
    data,
    members,
    categories,
    assetTypes,
    updateGroup,
    fetchStatus,
    inviteMemberToGroup,
  };
}
