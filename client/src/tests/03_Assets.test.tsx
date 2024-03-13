/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, expect, it } from "vitest";
import { screen, logRoles, waitFor } from "@testing-library/react";
import { userEventSetup } from "./utils/utils";

import LoginPage from "../pages/Login/LoginPage";
import { mockUserLoaderData } from "./mocks/useLoaderData";
import Header from "../components/common/Header";
import MainPage from "../pages/Main/MainPage";

describe("[scenario #4] switch sub pages with navigation menu on header", () => {
  it("should be equal between total amounts and expense amounts.", async () => {
    const mainPageWithHeader = () => {
      return (
        <>
          <Header />
          <MainPage />
        </>
      );
    };

    const { user, container } = userEventSetup(
      [
        { path: "/", jsx: mainPageWithHeader() },
        { path: "/main/expenses", jsx: mainPageWithHeader() },
        { path: "/main/expenses/weekly", jsx: mainPageWithHeader() },
        { path: "/main/assets/", jsx: mainPageWithHeader() },
        { path: "/main/assets/monthly", jsx: mainPageWithHeader() },
        { path: "/login", jsx: <LoginPage /> },
      ],
      // localstorage에 userData가 저장되어있는지 여부로 로그인 여부를 판단하므로,
      // mockuserData를 loader로 사용.
      mockUserLoaderData,
    );

    await waitFor(
      () => {
        const monthlyExpenseMenu = screen.getByRole("link", {
          name: /지출 내역/i,
        });
        expect(monthlyExpenseMenu).toBeInTheDocument();
        screen.debug();
      },
      { timeout: 2000 },
    );

    const assetNavigationMenu = await screen.findByRole("link", {
      name: /자산 조회/i,
    });
    expect(assetNavigationMenu).toBeInTheDocument();
    await user.click(assetNavigationMenu);

    await waitFor(
      () => {
        const monthlyAssetsMenu = screen.getByRole("link", {
          name: /월간 자산 조회/i,
        });
        expect(monthlyAssetsMenu).toBeInTheDocument();
        screen.debug();
      },
      { timeout: 2000 },
    );

    // await user.click(assetNavigationMenu);

    screen.debug();
    logRoles(container);
  });
});
