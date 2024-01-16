import { NavLink, Navigate, useLocation } from "react-router-dom";
import { PATH } from "../../global/constants";
import { useRecoilValue } from "recoil";
import { isLoginAtom } from "../../atoms/globalAtoms";

export default function MainPage() {
  const location = useLocation();

  const isLogin = useRecoilValue(isLoginAtom); // login 여부를 판별하는 상태.
  if (!isLogin) return <Navigate to={PATH.ROOT} />;

  return (
    <>
      <h1>{location.pathname}</h1>
      <NavLink to={PATH.LOGIN}>Login 페이지로</NavLink>
    </>
  );
}
