import { Outlet, useLoaderData } from "react-router-dom";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import { useLocation } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { isLoginAtom, currentUserAtom } from "../../atoms/globalAtoms";
import { PATH } from "../../global/constants";
import { useLayoutEffect } from "react";
import { loginUserType } from "../../global/customType";

export default function RootPage() {
  const location = useLocation();
  const currentPath = location.pathname; // path가root or login 인 경우 footer를 표시하지 않음

  const { result } = useLoaderData() as loginUserType;
  const setIsLogin = useSetRecoilState(isLoginAtom); // login 여부를 판별하는 상태.
  const setCurrentUser = useSetRecoilState(currentUserAtom);

  useLayoutEffect(() => {
    if (result.id) {
      setIsLogin(true);
      setCurrentUser({ userId: result.id, nickname: result.nickname });
      //console.log(result);
    }
  });

  return (
    <>
      <Header user={result} />
      <Outlet />
      {(currentPath === PATH.ROOT || currentPath === PATH.LOGIN) && <Footer />}
    </>
  );
}
