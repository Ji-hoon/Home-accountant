import { LABELS, PATH, URLS } from "./global/constants.ts";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { currentUserLoader } from "./router/currentUserLoader.ts";

import LandingPage from "./pages/Landing/LandingPage.tsx";
import LoginPage from "./pages/Login/LoginPage.tsx";
import MainPage from "./pages/Main/MainPage.tsx";
import ErrorPage from "./pages/Error/ErrorPage.tsx";
import RootPage from "./pages/Root/RootPage.tsx";
import InvitationPage from "./pages/Invitation/InvitationPage.tsx";
import { Helmet } from "react-helmet";

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
        path: PATH.INVITATION,
        element: <InvitationPage />,
      },
      {
        path: PATH.MAIN_EXPENSES,
        element: <MainPage />,
        children: [
          {
            path: PATH.MAIN_EXPENSES_BY_WEEK,
            element: <MainPage />,
          },
          {
            path: PATH.MAIN_EXPENSES_BY_MONTH,
            element: <MainPage />,
          },
          {
            path: PATH.MAIN_EXPENSES_BY_MEMBER,
            element: <MainPage />,
          },
        ],
      },
      {
        path: PATH.MAIN_ASSETS,
        element: <MainPage />,
        children: [
          {
            path: PATH.MAIN_ASSETS_BY_MONTH,
            element: <MainPage />,
          },
          {
            path: PATH.MAIN_ASSETS_BY_YEAR,
            element: <MainPage />,
          },
        ],
      },
      {
        path: PATH.MAIN_GROUP,
        element: <MainPage />,
        children: [
          {
            path: PATH.MAIN_GROUP_MEMBER,
            element: <MainPage />,
          },
          {
            path: PATH.MAIN_GROUP_SETTINGS,
            element: <MainPage />,
          },
        ],
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
  return (
    <>
      <Helmet>
        <title>가계부를 부탁해</title>
        <meta
          name="description"
          property="og:description"
          content={LABELS.FEATURE_01_DESC}
        />
        <meta property="og:url" content={import.meta.env.VITE_FRONTEND_URL} />
        <meta property="og:site_name" content="가계부를 부탁해" />
        <meta property="og:title" content={`가계부를 부탁해`} />
        <meta property="og:image" content={URLS.META_IMAGE} />
      </Helmet>
      <RouterProvider router={router} />
    </>
  );
}
