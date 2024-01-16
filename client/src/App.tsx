import { PATH } from "./global/constants.ts";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { currentUserLoader } from "./router/currentUserLoader.ts";

import LandingPage from "./pages/Landing/LandingPage.tsx";
import LoginPage from "./pages/Login/LoginPage.tsx";
import MainPage from "./pages/Main/MainPage.tsx";
import ErrorPage from "./pages/Error/ErrorPage.tsx";
import RootPage from "./pages/Root/RootPage.tsx";

const router = createBrowserRouter([
  {
    path: PATH.ROOT,
    loader: currentUserLoader,
    element: <RootPage />,
    children: [
      {
        path: PATH.ROOT,
        element: <LandingPage />,
      },
      {
        path: PATH.MAIN_EXPENSES,
        element: <MainPage />,
      },
      {
        path: PATH.MAIN_ASSETS,
        element: <MainPage />,
      },
      {
        path: PATH.MAIN_GROUP,
        element: <MainPage />,
      },
      {
        path: PATH.LOGIN,
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
