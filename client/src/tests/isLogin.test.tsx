import { screen } from "@testing-library/react";
import { userEventSetup } from "./utils/utils";

import LandingPage from "../pages/Landing/LandingPage";
import LoginPage from "../pages/Login/LoginPage";

describe("[scenario #1] landing page to login", () => {
  test("should be showned landing page before login.", async () => {
    userEventSetup([{ path: "/", jsx: <LandingPage /> }]);

    const button = await screen.findAllByRole("button", {
      name: /로그인 하러가기/i,
    });
    // screen.debug();

    expect(button[0]).toBeInTheDocument();
  });

  test("when click the login button, navigate to login page.", async () => {
    const { user } = userEventSetup([
      { path: "/", jsx: <LandingPage /> },
      { path: "/login", jsx: <LoginPage /> },
    ]);

    const button = await screen.findAllByRole("button", {
      name: /로그인 하러가기/i,
    });

    expect(button[0]).toBeInTheDocument();

    await user.click(button[0]); //TODO: error fix
  });
});
