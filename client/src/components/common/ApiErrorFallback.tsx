import { FallbackProps } from "react-error-boundary";
import { AxiosError } from "axios";
import profileAPI from "../dropdown/Dropdown.Profile.api";
import { useSetRecoilState } from "recoil";
import { currentUserAtom } from "../../atoms/globalAtoms";
import Button_Boxtype from "../basic/Button.boxType";
import styled from "styled-components";
import { SIZES } from "../../global/constants";

export default function ApiErrorFallback({
  error,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  resetErrorBoundary,
}: FallbackProps) {
  const setCurrentUser = useSetRecoilState(currentUserAtom);

  if (error instanceof AxiosError && error.response?.status === 401) {
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
    location.href = import.meta.env.VITE_FRONTEND_URL; //새로고침하여 이동
    return;
  }

  return (
    <ErrorFallback>
      오류가 발생했습니다.
      <Button_Boxtype onClick={resetErrorBoundary}>재시도</Button_Boxtype>
    </ErrorFallback>
  );
}

const ErrorFallback = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${SIZES.XXS}px;
  height: 100%;
`;
