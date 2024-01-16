import { PATH } from "../../global/constants";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LandingPage from "../Landing/LandingPage.tsx";
import LoginPage from "../Login/LoginPage.tsx";
import MainPage from "../Main/MainPage.tsx";
import { isLoginAtom } from "../../atoms/globalAtoms";
import { useRecoilValue } from "recoil";

export default function App() {
  const isLogin = useRecoilValue(isLoginAtom); // login 여부를 판별하는 상태.
  console.log(isLogin);
  const router = createBrowserRouter([
    {
      path: PATH.ROOT,
      element: isLogin ? <MainPage /> : <LandingPage />,
    },
    {
      path: PATH.MAIN,
      element: <MainPage />,
    },
    {
      path: PATH.LOGIN,
      element: <LoginPage />,
    },
    {
      path: "*",
      element: <>404 페이지</>,
    },
  ]);

  return <RouterProvider router={router} />;
}
