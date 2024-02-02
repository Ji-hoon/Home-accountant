import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import invitationAPI from "./Invitation.api";
import { queryKeys } from "../../global/reactQuery";
import { useNavigate } from "react-router";
import { PATH } from "../../global/constants";
import { AxiosError } from "axios";
import { useSetRecoilState } from "recoil";
import { currentUserAtom } from "../../atoms/globalAtoms";
import { updateCurrentGroup } from "../../components/util/updateLocalStorage";

export function useInvitation(code: string) {
  const setCurrentUser = useSetRecoilState(currentUserAtom);

  const navigate = useNavigate();
  const results = useSuspenseQuery({
    queryKey: [queryKeys.currentGroup],
    queryFn: () => invitationAPI.getGroupInfo(code),
  });

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
        const newUserInfo = updateCurrentGroup(results.data.groupInfo._id);
        setCurrentUser(() => newUserInfo);
        navigate(PATH.MAIN_GROUP);
      }
    },
    onSettled: () => {
      //setisLoading(!isLoading);
    },
  }).mutateAsync;

  return { results, joinGroup };
}
