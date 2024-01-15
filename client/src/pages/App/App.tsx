import { PATH } from "../../global/constants";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LandingPage from "../Landing/LandingPage.tsx";
import LoginPage from "../Login/LoginPage.tsx";
import MainPage from "../Main/MainPage.tsx";

const isLogin = false; // login 여부를 판별하는 변수. 추후 다른 방식으로 변경 예정

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

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
