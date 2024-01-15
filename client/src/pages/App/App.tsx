import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Landing from "../Landing/Landing.tsx";
import { PATH } from "../../global/constants";

const isLogin = false;

const router = createBrowserRouter([
  {
    path: PATH.ROOT,
    element: isLogin ? (
      <>
        <h1>Hello, Home accountant!</h1>
      </>
    ) : (
      <Landing />
    ),
  },
  {
    path: PATH.LOGIN,
    element: <>로그인 페이지</>,
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
