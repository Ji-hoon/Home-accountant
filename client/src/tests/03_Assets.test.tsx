/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, expect, it } from "vitest";
import { screen, logRoles, waitFor } from "@testing-library/react";
import { userEventSetup } from "./utils/utils";

import LoginPage from "../pages/Login/LoginPage";
import { mockUserLoaderData } from "./mocks/useLoaderData";
import Header from "../components/common/Header";
import MainPage from "../pages/Main/MainPage";
import Dialog from "../components/dialog/Dialog";

describe("[scenario #1] switch sub pages with navigation menu on header", () => {
  it("should be equal between total amounts and expense amounts.", async () => {
    const mainWithHeader = () => {
      return (
        <>
          <Header />
          <MainPage />
        </>
      );
    };

    const mainWithHeaderAndDialog = () => {
      return (
        <>
          <Header />
          <MainPage />
          <Dialog />
        </>
      );
    };

    const { user, container } = userEventSetup(
      [
        { path: "/", jsx: <MainPage /> },
        { path: "/main/expenses", jsx: mainWithHeader() },
        { path: "/main/expenses/weekly", jsx: mainWithHeader() },
        { path: "/main/assets/", jsx: mainWithHeaderAndDialog() },
        { path: "/main/assets/monthly", jsx: mainWithHeaderAndDialog() },
        { path: "/login", jsx: <LoginPage /> },
      ],
      // localstorage에 userData가 저장되어있는지 여부로 로그인 여부를 판단하므로,
      // mockuserData를 loader로 사용.
      mockUserLoaderData,
    );

    await waitFor(
      () => {
        const expenseFloatingButtonElement = screen.getByRole("button", {
          name: /지출 내역 추가/i,
        });
        expect(expenseFloatingButtonElement).toBeInTheDocument();
        screen.debug();
      },
      { timeout: 2000 },
    );

    // react portal을 사용하는 Dialog 컴포넌트가 사용할 dialog div를 임의 추가
    const portalRoot = document.createElement("div");
    portalRoot.setAttribute("id", "dialog");
    document.body.appendChild(portalRoot);

    await waitFor(
      () => {
        const monthlyExpenseMenu = screen.getByRole("link", {
          name: "지출 내역",
        });
        expect(monthlyExpenseMenu).toBeInTheDocument();
        screen.debug();
      },
      { timeout: 1000 },
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
      { timeout: 1000 },
    );

    const dataInfo = await screen.findByTestId("date-info");
    expect(dataInfo).toHaveTextContent("2024년 3월");

    // screen.debug();
    logRoles(container);
  });
});
