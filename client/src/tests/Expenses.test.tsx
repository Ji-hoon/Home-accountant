/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, expect, it } from "vitest";
import { screen, logRoles } from "@testing-library/react";
import { userEventSetup } from "./utils/utils";

import LoginPage from "../pages/Login/LoginPage";
import { mockUserLoaderData } from "./mocks/useLoaderData";
import MainPage from "../pages/Main/MainPage";
import Header from "../components/common/Header";

// import Dialog from "../components/dialog/Dialog";
// import { RecoilRoot } from "recoil";
// import { QueryClientProvider } from "@tanstack/react-query";
// import { queryClient } from "../global/reactQuery";

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
    logRoles(container);
  });

  it("should be navigate monthly expense list page when click the monthly exepense button.", async () => {
    const mainWithHeader = () => {
      return (
        <>
          <Header />
          <MainPage />
        </>
      );
    };

    const { user } = userEventSetup(
      [
        {
          path: "/",
          jsx: <MainPage />,
        },
        { path: "/main/expenses", jsx: <MainPage /> },
        {
          path: "/main/expenses/weekly",
          jsx: mainWithHeader(),
        },
        {
          path: "/main/expenses/monthly",
          jsx: mainWithHeader(),
        },
        { path: "/login", jsx: <LoginPage /> },
      ],
      // localstorage에 userData가 저장되어있는지 여부로 로그인 여부를 판단하므로,
      // mockuserData를 loader로 사용.
      mockUserLoaderData,
    );

    const portalRoot = document.createElement("div");
    portalRoot.setAttribute("id", "dialog");
    document.body.appendChild(portalRoot);

    const expenseList = await screen.findByTestId("expense-item", {
      exact: false,
    });
    expect(expenseList).toBeInTheDocument();
    await user.click(expenseList);

    const monthlyExpenseMenu = await screen.findByRole("link", {
      name: "월간 지출 내역",
    });

    await user.click(monthlyExpenseMenu);

    const dataInfo = await screen.findByTestId("date-info");
    expect(dataInfo).toHaveTextContent("2024년 3월");

    screen.debug();
  });
});

// it("should be open modal when click the expense list.", async () => {
// render(
//   <QueryClientProvider client={queryClient}>
//     <RecoilRoot>
//       <Dialog />
//     </RecoilRoot>
//   </QueryClientProvider>
// );
// screen.debug();
// logRoles(container);

// const modalHeading = await screen.findByRole("heading", {
//   name: "지출 내역 수정",
// });
// expect(modalHeading).toBeInTheDocument();
