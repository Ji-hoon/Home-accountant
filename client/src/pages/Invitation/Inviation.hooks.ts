import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import invitationAPI from "./Invitation.api";
import { queryKeys } from "../../global/reactQuery";
import { useNavigate } from "react-router";
import { PATH } from "../../global/constants";
import { AxiosError } from "axios";
import { useSetRecoilState } from "recoil";
import { currentUserAtom } from "../../atoms/globalAtoms";

export function useInvitation(code: string) {
  const setCurrentUser = useSetRecoilState(currentUserAtom);

  const navigate = useNavigate();
  const results = useSuspenseQuery({
    queryKey: [queryKeys.currentGroup],
    queryFn: () => invitationAPI.getGroupInfo(code),
  });

  function updateCurrentGroup(groupId: string) {
    const currentUserInfo = localStorage.getItem("currentUser");
    const parsedCurrentUserInfo =
      currentUserInfo && JSON.parse(currentUserInfo);
    const newUserInfo = { ...parsedCurrentUserInfo, currentGroup: groupId };
    //console.log(data, newUserInfo);
    setCurrentUser(() => newUserInfo);
    localStorage.setItem("currentUser", JSON.stringify(newUserInfo));
  }

  const joinGroup = useMutation({
    mutationFn: invitationAPI.join,
    onMutate: () => {
      //setisLoading(!isLoading);
    },
    onSuccess: (data) => {
      updateCurrentGroup(data.groupId);
      navigate(PATH.MAIN_EXPENSES);
    },
    onError: (err) => {
      console.log(err);
      // toast.error(
      //   err instanceof AxiosError ? err.response?.data.error : "unknown error",
      // );
      if (err instanceof AxiosError && err.response?.status === 405) {
        updateCurrentGroup(results.data.groupInfo._id);
        navigate(PATH.MAIN_GROUP);
      }
    },
    onSettled: () => {
      //setisLoading(!isLoading);
    },
  }).mutateAsync;

  return { results, joinGroup };
}
