import { Outlet, useLoaderData } from "react-router-dom";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import { useLocation } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { isLoginAtom } from "../../atoms/globalAtoms";
import { PATH } from "../../global/constants";
import { useLayoutEffect } from "react";

type ResultType = {
  result: {
    id: string;
    nickname: string;
  };
};

export default function RootPage() {
  const location = useLocation();
  const currentPath = location.pathname; // path가root or login 인 경우 footer를 표시하지 않음

  const { result } = useLoaderData() as ResultType;
  const setIsLogin = useSetRecoilState(isLoginAtom); // login 여부를 판별하는 상태.

  useLayoutEffect(() => {
    if (result.id) {
      setIsLogin(true);
      //console.log(result);
    }
  });

  return (
    <>
      <Header />
      <Outlet />
      {!currentPath.includes(PATH.MAIN) ? <Footer /> : <></>}
    </>
  );
}
