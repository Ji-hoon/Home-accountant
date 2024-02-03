import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "../../global/reactQuery";
import profileAPI from "./Dropdown.Profile.api";
// import { useNavigate } from "react-router";
// import { PATH } from "../../global/constants";
import { useSetRecoilState } from "recoil";
import { currentUserAtom } from "../../atoms/globalAtoms";

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
      // const message =
      //   response.status === 204
      //     ? "로그아웃 되었습니다."
      //     : response.data.message;
      console.log(response);
      localStorage.removeItem("currentUser");
      const resetUser = {
        userId: "",
        nickname: "",
        currentGroup: "",
        currentRole: "",
        profile: "",
      };
      setCurrentUser(() => resetUser);
      location.href = import.meta.env.VITE_FRONTEND_URL; //새로고침하여 이동
    },
    onError: (error) => {
      console.log(error);
    },
  }).mutateAsync;

  return { result, logout };
}
