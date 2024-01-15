import { PATH } from "../../global/constants";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LandingPage from "../Landing/LandingPage.tsx";
import LoginPage from "../Login/LoginPage.tsx";
import MainPage from "../Main/MainPage.tsx";

const isLogin = false;

const router = createBrowserRouter([
  {
    path: PATH.ROOT,
    element: isLogin ? <MainPage /> : <LandingPage />,
  },
  {
    path: PATH.APP,
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
