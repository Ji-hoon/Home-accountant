import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import invitationAPI from "./Invitation.api";
import { queryKeys } from "../../global/reactQuery";
import { useNavigate } from "react-router";
import { PATH } from "../../global/constants";
import { AxiosError } from "axios";
import { useRecoilState } from "recoil";
import { currentUserAtom } from "../../atoms/globalAtoms";
import { updateCurrentGroup } from "../../components/util/updateLocalStorage";

export function useInvitation(code: string) {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserAtom);

  const navigate = useNavigate();
  const results = useSuspenseQuery({
    queryKey: [queryKeys.currentGroup],
    queryFn: () => invitationAPI.getGroupInfo(code),
  });

  const existUser = results?.data?.groupInfo?.members?.find(
    (member: { userId: string }) => member.userId === currentUser.userId,
  );
  // console.log(existUser);

  const joinGroup = useMutation({
    mutationFn: invitationAPI.join,
    onMutate: () => {
      //setisLoading(!isLoading);
    },
    onSuccess: (data) => {
      const newUserInfo = updateCurrentGroup({
        groupId: data.groupId,
        role: data.result.role,
      });
      setCurrentUser(() => newUserInfo);
      location.href = import.meta.env.VITE_FRONTEND_URL;
    },
    onError: (err) => {
      console.log(err);
      // toast.error(
      //   err instanceof AxiosError ? err.response?.data.error : "unknown error",
      // );
      if (err instanceof AxiosError && err.response?.status === 405) {
        const newUserInfo = updateCurrentGroup({
          groupId: results.data.groupInfo._id,
          role: existUser.role,
        });
        setCurrentUser(() => newUserInfo);
        navigate(PATH.MAIN_EXPENSES);
      }
    },
    onSettled: () => {
      //setisLoading(!isLoading);
    },
  }).mutateAsync;

  return { results, joinGroup };
}
