import { Navigate, useLocation } from "react-router-dom";
import { PATH } from "../../global/constants";
import { useRecoilValue } from "recoil";
import { isLoginAtom } from "../../atoms/globalAtoms";
import Layout_HorizontalView from "../../components/layout/Layout.horizontalView";
import Expenses_SubPage from "./subpages/Expenses";

export default function MainPage() {
  const location = useLocation();
  const isLogin = useRecoilValue(isLoginAtom); // login 여부를 판별하는 상태.

  return (
    <>
      {!isLogin && <Navigate to={PATH.LOGIN} />}
      {location.pathname == PATH.MAIN_EXPENSES && (
        <Navigate to={PATH.MAIN_EXPENSES_FILTER_BY_MONTH} />
      )}
      {isLogin && location.pathname.includes(PATH.MAIN_EXPENSES) && (
        <Layout_HorizontalView>
          <Expenses_SubPage />
        </Layout_HorizontalView>
      )}
    </>
  );
}
