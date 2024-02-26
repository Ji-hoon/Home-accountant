import { FallbackProps } from "react-error-boundary";
import { AxiosError } from "axios";
import { VALUES } from "../../global/constants";
import profileAPI from "../dropdown/Dropdown.Profile.api";
import { useSetRecoilState } from "recoil";
import { currentUserAtom } from "../../atoms/globalAtoms";

export default function ApiErrorFallback({
  error,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  resetErrorBoundary,
}: FallbackProps) {
  const setCurrentUser = useSetRecoilState(currentUserAtom);

  if (error instanceof AxiosError && error.response?.status === 401) {
    //toast.error(error.response.data.message);
    profileAPI.logout();
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
    }, VALUES.TIMEOUT_DELAY_TIME);
  }

  return <></>;
}
