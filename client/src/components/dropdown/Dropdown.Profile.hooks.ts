import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "../../global/reactQuery";
import profileAPI from "./Dropdown.Profile.api";
// import { useNavigate } from "react-router";
// import { PATH } from "../../global/constants";
import { useSetRecoilState } from "recoil";
import { currentUserAtom } from "../../atoms/globalAtoms";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { LABELS } from "../../global/constants";

export function useDropdownProfile(userId: string) {
  //const navigate = useNavigate();
  const setCurrentUser = useSetRecoilState(currentUserAtom);

  const result = useSuspenseQuery({
    queryKey: [queryKeys.currentUser],
    queryFn: () => profileAPI.getGroupInfo(userId),
  });
  //console.log(result);

  const logout = useMutation({
    mutationFn: profileAPI.logout,
    onSuccess: (response) => {
      console.log(response);
      toast.success(LABELS.MESSAGE_LOGOUT);
      localStorage.removeItem("currentUser");
      const resetUser = {
        userId: "",
        nickname: "",
        currentGroup: "",
        currentRole: "",
        profile: "",
      };
      setCurrentUser(() => resetUser);
      setTimeout(() => {
        location.href = import.meta.env.VITE_FRONTEND_URL; //새로고침하여 이동
      }, 300);
    },
    onError: (err) => {
      console.log(err);
      toast.error(
        err instanceof AxiosError ? err.response?.data.error : "unknown error",
      );
    },
  }).mutateAsync;

  return { result, logout };
}
