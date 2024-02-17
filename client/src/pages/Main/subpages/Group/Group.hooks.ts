import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { queryClient, queryKeys } from "../../../../global/reactQuery";
import groupsAPI from "./Group.api";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useRecoilValue } from "recoil";
import { emailListAtom } from "../../../../atoms/globalAtoms";

export function useGroups(currentGroupId: string) {
  const results = useSuspenseQuery({
    queryKey: [queryKeys.currentGroup],
    queryFn: () => groupsAPI.get(currentGroupId),
  });

  const { data, refetch, fetchStatus } = results;

  const emailList = useRecoilValue(emailListAtom);
  const groupId = results.data.data.groupInfo.id;
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
    mutationFn: async () => {
      if (emailList.length === 0) {
        toast.error("이메일을 입력해주세요.");
        return;
      }
      const response = await Promise.all(
        emailList.map((member: string) =>
          groupsAPI.invite({ groupId, member }),
        ),
      );
      console.log(response);
      const results = response.filter((result) => result.status === 200);

      if (results.length === 0) {
        toast.error("이메일 전송에 실패했습니다.");
        return;
      }

      return results;
    },
    onMutate: () => {
      //setisLoading(!isLoading);
    },
    onSuccess: (data) => {
      console.log(data);
      if (data) toast.success(data[0].data.message);
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
