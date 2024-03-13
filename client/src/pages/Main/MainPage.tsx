import { Navigate, useLocation } from "react-router-dom";
import { PATH } from "../../global/constants";
import { useRecoilValue } from "recoil";
import { isLoginAtom } from "../../atoms/globalAtoms";
import HorizontalViewLayout from "../../components/layout/horizontalView.Layout";
import Expenses_SubPage from "./subpages/ExpensesSubPage";
import Assets_SubPage from "./subpages/AssetsSubPage";
import Group_SubPage from "./subpages/GroupSubPage";

export default function MainPage() {
  const location = useLocation();
  const isLogin = useRecoilValue(isLoginAtom); // login 여부를 판별하는 상태.
  console.log("main");
  return (
    <>
      {location.pathname == PATH.MAIN_EXPENSES && (
        <Navigate to={PATH.MAIN_EXPENSES_BY_WEEK} />
      )}
      {location.pathname == PATH.MAIN_ASSETS && (
        <Navigate to={PATH.MAIN_ASSETS_BY_MONTH} />
      )}
      {location.pathname == PATH.MAIN_GROUP && (
        <Navigate to={PATH.MAIN_GROUP_MEMBER} />
      )}
      {isLogin && (
        <HorizontalViewLayout>
          <>
            {(location.pathname === PATH.MAIN_EXPENSES_BY_WEEK ||
              location.pathname === PATH.MAIN_EXPENSES_BY_MEMBER ||
              location.pathname === PATH.MAIN_EXPENSES_BY_MONTH) && (
              <Expenses_SubPage />
            )}
            {(location.pathname === PATH.MAIN_ASSETS_BY_MONTH ||
              location.pathname === PATH.MAIN_ASSETS_BY_YEAR) && (
              <Assets_SubPage />
            )}
            {(location.pathname === PATH.MAIN_GROUP_MEMBER ||
              location.pathname === PATH.MAIN_GROUP_SETTINGS) && (
              <Group_SubPage />
            )}
          </>
        </HorizontalViewLayout>
      )}
      {!isLogin && <Navigate to={PATH.LOGIN} />}
    </>
  );
}
