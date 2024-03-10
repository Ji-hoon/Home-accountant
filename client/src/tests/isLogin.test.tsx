import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { userEventSetup } from "./utils/utils";

import LandingPage from "../pages/Landing/LandingPage";
import LoginPage from "../pages/Login/LoginPage";
import { mockUserLoaderData } from "./mocks/useLoaderData";

describe("[scenario #1] landing page to login", () => {
  it("should be shown landing page before login.", async () => {
    userEventSetup(
      [{ path: "/", jsx: <LandingPage /> }],
      vi.fn().mockReturnValue({
        result: {},
      }),
    );

    const loginButtonElements = await screen.findAllByRole("button", {
      name: /로그인 하러가기/i,
    });
    screen.debug();

    expect(loginButtonElements[0]).toBeInTheDocument();
  });

  it("should be navigate to login page when click the login button", async () => {
    const { user } = userEventSetup(
      [
        { path: "/", jsx: <LandingPage /> },
        { path: "/login", jsx: <LoginPage /> },
      ],
      vi.fn().mockReturnValue({
        result: {},
      }),
    );

    const loginButtonElements = await screen.findAllByRole("button", {
      name: /로그인 하러가기/i,
    });

    await user.click(loginButtonElements[0]); //TODO: error fix
    // screen.debug();

    const loginHeaderElement = await screen.findByRole("heading", {
      name: /자산 관리를 시작해보세요/i,
    });

    expect(loginHeaderElement).toBeInTheDocument();

    const kakaoLoginButtonElement = await screen.findByRole("button", {
      name: /카카오 계정으로 로그인/i,
    });
    expect(kakaoLoginButtonElement).toHaveAttribute("id", "kakao");
    screen.debug();
  });

  it("should be redirect to app page after login success.", async () => {
    userEventSetup(
      [{ path: "/", jsx: <LandingPage /> }], //TODO : need to change with <MainPage />
      mockUserLoaderData,
    );
    screen.debug();
  });
});
