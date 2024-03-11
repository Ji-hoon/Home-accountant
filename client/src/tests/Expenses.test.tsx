/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, expect, it } from "vitest";
import { screen, logRoles } from "@testing-library/react";
import { userEventSetup } from "./utils/utils";

import LoginPage from "../pages/Login/LoginPage";
import { mockUserLoaderData } from "./mocks/useLoaderData";
import MainPage from "../pages/Main/MainPage";

describe("[scenario #1] exepense amounts and detail need to be synced", () => {
  it("should be shown landing page before login.", async () => {
    const { user, container } = userEventSetup(
      [
        { path: "/", jsx: <MainPage /> },
        { path: "/main/expenses", jsx: <MainPage /> },
        { path: "/main/expenses/weekly", jsx: <MainPage /> },
        { path: "/login", jsx: <LoginPage /> },
      ],
      mockUserLoaderData, // localstorage에 userData가 저장되어있는지 여부로 로그인 여부를 판단하므로, mockuserData를 loader로 사용.
    );
    const expenseAmountsValue = await screen.findByText(/-/i, {
      exact: false,
    });
    screen.debug();
    logRoles(container);
    expect(expenseAmountsValue).toHaveTextContent("27,500");
  });
});
