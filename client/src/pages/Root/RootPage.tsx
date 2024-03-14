import { Outlet, useLoaderData } from "react-router-dom";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import { useLocation } from "react-router-dom";
import { useSetRecoilState, useRecoilState } from "recoil";
import { isLoginAtom, currentUserAtom } from "../../atoms/globalAtoms";
import { PATH } from "../../global/constants";
import { useLayoutEffect, useState } from "react";
import { loginUserType } from "../../global/customType";
import ApiBoundary from "../../components/common/ApiBoundary";

export default function RootPage() {
  return (
    <ApiBoundary>
      <ApiComponent />
    </ApiBoundary>
  );
}

function ApiComponent() {
  const location = useLocation();
  const currentPath = location.pathname; // path가root or login 인 경우 footer를 표시하지 않음

  const { result } = useLoaderData() as loginUserType;
  const [isLogin, setIsLogin] = useRecoilState(isLoginAtom); // login 여부를 판별하는 상태.
  const setCurrentUser = useSetRecoilState(currentUserAtom);
  const currentUserInfo = {
    userId: result.userId,
    nickname: result.nickname,
    currentGroup: result.currentGroup,
    currentRole: result.currentRole,
    profile: result.profile,
  };

  const [isLandingPath, setIsLandingPath] = useState(false);

  useLayoutEffect(() => {
    if (result.userId) {
      setIsLogin(true);
      setCurrentUser(() => currentUserInfo);
    }
    if (
      (currentPath === PATH.ROOT && !isLogin) ||
      (currentPath === PATH.LOGIN && !isLogin) ||
      currentPath === PATH.INVITATION
    ) {
      setIsLandingPath(true);
      return;
    }
    setIsLandingPath(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPath, isLogin, setIsLogin, setCurrentUser]);

  return (
    <>
      <Header user={currentUserInfo} />
      <Outlet />
      {isLandingPath && <Footer />}
    </>
  );
}
