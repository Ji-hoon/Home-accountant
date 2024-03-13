/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, expect, it } from "vitest";
import { screen, logRoles, waitFor } from "@testing-library/react";
import { userEventSetup } from "./utils/utils";

import LoginPage from "../pages/Login/LoginPage";
import { mockUserLoaderData } from "./mocks/useLoaderData";
import MainPage from "../pages/Main/MainPage";
import Header from "../components/common/Header";

import Dialog from "../components/dialog/Dialog";
import { server } from "./mocks/server";
import { HttpResponse, http } from "msw";

describe("[scenario #1] exepense amounts and detail need to be synced", () => {
  it("should be equal between total amounts and expense amounts.", async () => {
    userEventSetup(
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

    await waitFor(
      () => {
        const expenseAmountsValue = screen.getByTitle("expenses-amounts");
        expect(expenseAmountsValue).toHaveTextContent("27,500");
        screen.debug();
      },
      { timeout: 2000 },
    );

    // const expenseAmountsValue = await screen.findByTitle("expenses-amounts");
    // expect(expenseAmountsValue).toHaveTextContent("27,500");

    const expenseListAmounts = await screen.findAllByRole("heading", {
      name: /원/i,
    });
    expect(expenseListAmounts.length).toEqual(1);
    expect(expenseListAmounts[0]).toHaveTextContent("27,500");

    // screen.debug();
    // logRoles(container);
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

    // screen.debug();
  });

  it("should be open modal when click the expense list.", async () => {
    const mainWithDialog = () => {
      return (
        <>
          <MainPage />
          <Dialog />
        </>
      );
    };

    const { user, container } = userEventSetup(
      [
        {
          path: "/",
          jsx: <MainPage />,
        },
        { path: "/main/expenses", jsx: <MainPage /> },
        {
          path: "/main/expenses/weekly",
          jsx: mainWithDialog(),
        },
        {
          path: "/main/expenses/monthly",
          jsx: mainWithDialog(),
        },
        { path: "/login", jsx: <LoginPage /> },
      ],
      // localstorage에 userData가 저장되어있는지 여부로 로그인 여부를 판단하므로,
      // mockuserData를 loader로 사용.
      mockUserLoaderData,
    );

    // react portal을 사용하는 Dialog 컴포넌트가 사용할 dialog div를 임의 추가
    const portalRoot = document.createElement("div");
    portalRoot.setAttribute("id", "dialog");
    document.body.appendChild(portalRoot);

    const expenseList = await screen.findByTestId("expense-item", {
      exact: false,
    });
    expect(expenseList).toBeInTheDocument();
    if (expenseList.getAttribute("id") === "65b9c7bc62cbeb63b583e64f") {
      await user.click(expenseList);
    }

    const modalSubmit = await screen.findByRole("button", {
      name: "지출 내역 수정",
    });
    expect(modalSubmit).toBeInTheDocument();

    const expenseInputElement = await screen.findByRole("spinbutton");
    expect(expenseInputElement).toHaveValue(27500);

    await user.clear(expenseInputElement);
    await user.type(expenseInputElement, "20000");

    // 지출 내역 수정 이후 API 응답 리셋
    server.resetHandlers(
      http.get(`${import.meta.env.VITE_BACKEND_URL}/api/expenses`, async () => {
        return HttpResponse.json([
          {
            _id: "65b9c7bc62cbeb63b583e64f",
            amounts: 20000,
            businessName: "컬리",
            date: new Date("2024-01-28T15:00:00.000Z").toISOString(), //"2024-01-28T15:00:00.000Z",
            isRecurring: "일시불",
            category: "식비",
            owner: "훈",
          },
        ]);
      }),
      http.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/expenses/65b9c7bc62cbeb63b583e64f`,
        async () => {
          return HttpResponse.json({
            message: "지출 내역 수정에 성공했습니다.",
            asset: {
              _id: "65b9c7bc62cbeb63b583e64f",
              amounts: 20000,
              businessName: "컬리",
              date: new Date("2024-01-28T15:00:00.000Z").toISOString(),
              category: "65de85c3004d3cec9ede0f33",
              owner: "65b73d1d95fd2333931df19f",
              groupId: "65b73d1d95fd2333931df1a2",
              isRecurring: "일시불",
              createdAt: "2024-03-01T08:13:20.643Z",
              updatedAt: "2024-03-12T15:50:59.800Z",
              __v: 0,
            },
          });
        },
      ),
      http.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/expenses/amounts`,
        async () => {
          return HttpResponse.json(20000);
        },
      ),
    );

    await user.click(modalSubmit);
    expect(modalSubmit).not.toBeInTheDocument();

    const expenseListAmounts = expenseList.querySelector(".amounts");
    expect(expenseListAmounts).toHaveTextContent("20,000");

    screen.debug();
    logRoles(container);
  });
});
