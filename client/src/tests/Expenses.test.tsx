/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, expect, it } from "vitest";
import { screen, logRoles } from "@testing-library/react";
import { userEventSetup } from "./utils/utils";

import LoginPage from "../pages/Login/LoginPage";
import { mockUserLoaderData } from "./mocks/useLoaderData";
import MainPage from "../pages/Main/MainPage";

describe("[scenario #1] exepense amounts and detail need to be synced", () => {
  it("should be equal between total amounts and expense amounts.", async () => {
    const { container } = userEventSetup(
      [
        { path: "/", jsx: <MainPage /> },
        { path: "/main/expenses", jsx: <MainPage /> },
        { path: "/main/expenses/weekly", jsx: <MainPage /> },
        { path: "/login", jsx: <LoginPage /> },
      ],
      // localstorage에 userData가 저장되어있는지 여부로 로그인 여부를 판단하므로,
      // mockuserData를 loader로 사용.
      mockUserLoaderData,
    );
    const expenseAmountsValue = await screen.findByTitle("expenses-amounts");
    expect(expenseAmountsValue).toHaveTextContent("27,500");

    const expenseListAmounts = await screen.findAllByRole("heading", {
      name: /원/i,
    });
    expect(expenseListAmounts.length).toEqual(1);
    expect(expenseListAmounts[0]).toHaveTextContent("27,500");

    // screen.debug();
    // logRoles(container);
  });

  it("should be open modal when click the expense list.", async () => {
    const { user, container } = userEventSetup(
      [
        { path: "/", jsx: <MainPage /> },
        { path: "/main/expenses", jsx: <MainPage /> },
        { path: "/main/expenses/weekly", jsx: <MainPage /> },
        { path: "/login", jsx: <LoginPage /> },
      ],
      // localstorage에 userData가 저장되어있는지 여부로 로그인 여부를 판단하므로,
      // mockuserData를 loader로 사용.
      mockUserLoaderData,
    );

    const portalRoot = document.createElement("div");
    portalRoot.setAttribute("id", "dialog");
    document.body.appendChild(portalRoot);

    const expenseLists = await screen.findAllByTestId("expense-item", {
      exact: false,
    });
    await user.click(expenseLists[0]);

    const modalHeading = await screen.findByRole("heading", {
      name: "지출 내역 수정",
    });
    expect(modalHeading).toBeInTheDocument();

    screen.debug();
    logRoles(container);
  });
});
