import { NavLink, Navigate, useLocation } from "react-router-dom";
import { LABELS, PATH } from "../../global/constants";
import { useRecoilValue } from "recoil";
import { isLoginAtom } from "../../atoms/globalAtoms";
import Navigation_ListType from "../../components/basic/Navigation.listType";
import Layout_HorizontalView from "../../components/layout/Layout.horizontalView";

export default function MainPage() {
  const location = useLocation();
  const isLogin = useRecoilValue(isLoginAtom); // login 여부를 판별하는 상태.

  return (
    <>
      {!isLogin && <Navigate to={PATH.LOGIN} />}
      {isLogin && (
        <Layout_HorizontalView>
          <>
            <div>
              <Navigation_ListType>
                <>
                  <NavLink to={PATH.MAIN_EXPENSES}>
                    {LABELS.NAVIGATION_MENU_EXPENSES_BY_MONTH}
                  </NavLink>
                  <NavLink to={PATH.MAIN_EXPENSES}>
                    {LABELS.NAVIGATION_MENU_EXPENSES_BY_MEMBER}
                  </NavLink>
                </>
              </Navigation_ListType>
            </div>
            <div>
              <h1>{location.pathname}</h1>
              <NavLink to={PATH.LOGIN}>Login 페이지로</NavLink>
            </div>
          </>
        </Layout_HorizontalView>
      )}
    </>
  );
}
