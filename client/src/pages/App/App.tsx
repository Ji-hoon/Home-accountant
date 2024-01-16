import { PATH } from "../../global/constants";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LandingPage from "../Landing/LandingPage.tsx";
import LoginPage from "../Login/LoginPage.tsx";
import MainPage from "../Main/MainPage.tsx";
import ErrorPage from "../Error/ErrorPage.tsx";

export default function App() {
  const router = createBrowserRouter([
    {
      path: PATH.ROOT,
      element: <LandingPage />,
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
      element: <ErrorPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}
