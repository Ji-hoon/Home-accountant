/* eslint-disable @typescript-eslint/no-unused-vars */
import { userEventSetup } from "./utils/utils";
import { screen, logRoles, waitFor } from "@testing-library/react";

import MainPage from "../pages/Main/MainPage";
import LoginPage from "../pages/Login/LoginPage";
import { mockUserLoaderData } from "./mocks/useLoaderData";
import RootPage from "../pages/Root/RootPage";
import { server } from "./mocks/server";
import { HttpResponse, http } from "msw";

describe("[scenario #1] navigate to group management sub page when click the navigation menu on header", () => {
  it("should be navigate group memeber info page when click the group management button", async () => {
    const mainWithHeader = () => {
      return (
        <>
          <RootPage />
          <MainPage />
        </>
      );
    };

    const { user, container } = userEventSetup(
      [
        { path: "/", jsx: <MainPage /> },
        { path: "/main/expenses", jsx: mainWithHeader() },
        { path: "/main/expenses/weekly", jsx: mainWithHeader() },
        { path: "/main/group/", jsx: mainWithHeader() },
        { path: "/main/group/member", jsx: mainWithHeader() },
        { path: "/main/group/settings", jsx: mainWithHeader() },
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

    // react portal을 사용하는 Dialog 컴포넌트가 사용할 dialog div를 임의 추가
    const portalRoot = document.createElement("div");
    portalRoot.setAttribute("id", "dialog");
    document.body.appendChild(portalRoot);

    const groupMgmtButton = await screen.findByRole("button", {
      name: "그룹 관리",
    });
    expect(groupMgmtButton).toBeInTheDocument();
    screen.debug();

    await user.click(groupMgmtButton);

    await waitFor(
      () => {
        const groupMemberInfoMenu = screen.getByRole("link", {
          name: /참여 멤버/i,
        });
        expect(groupMemberInfoMenu).toBeInTheDocument();
        screen.debug();
      },
      { timeout: 1000 },
    );

    const groupMemberCount = await screen.findByRole("heading", {
      name: /참여 멤버/i,
    });
    expect(groupMemberCount).toHaveTextContent("1");

    const groupInfoButton = await screen.findByRole("button", {
      name: "그룹 정보",
    });
    expect(groupInfoButton).toBeInTheDocument();
    screen.debug();

    await user.click(groupInfoButton);

    await waitFor(
      () => {
        const groupInfoTitle = screen.getByRole("heading", {
          name: /그룹 정보/i,
        });
        expect(groupInfoTitle).toBeInTheDocument();
        screen.debug();
        logRoles(container);
      },
      { timeout: 2000 },
    );

    const groupNameField =
      await screen.findByPlaceholderText("그룹명을 입력해주세요.");
    expect(groupNameField).toHaveValue("훈님의 가계부");

    await user.type(groupNameField, "2");
    expect(groupNameField).toHaveValue("훈님의 가계부2");

    const groupUpdateButton = await screen.findByRole("button", {
      name: "그룹 정보 변경",
    });
    await user.click(groupUpdateButton);

    server.resetHandlers(
      http.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/groups/65b73d1d95fd2333931df1a2`,
        async () => {
          return HttpResponse.json({
            message: "그룹 조회에 성공했습니다.",
            groupInfo: {
              id: "65b73d1d95fd2333931df1a2",
              code: "3287612204",
              name: "훈님의 가계부",
              members: [
                {
                  userId: "65b73d1d95fd2333931df19f",
                  nickname: "훈",
                  profileImgUrl:
                    "http://k.kakaocdn.net/dn/CjcgX/btsDqiDbLki/lAvaEBFFs9qcewizh6zLEK/img_640x640.jpg",
                  role: "OWNER",
                  joinedAt: "2024-01-29T05:52:29.299Z",
                },
              ],
              categories: [
                {
                  _id: "65c0397b36696234ca23ea02",
                  name: "식비",
                  groupId: "65b73d1d95fd2333931df1a2",
                  status: "ACTIVE",
                  type: "FOOD",
                  createdAt: "2024-02-05T01:27:23.720Z",
                  updatedAt: "2024-02-05T02:34:21.757Z",
                  __v: 0,
                },
              ],
              assetTypes: [
                {
                  _id: "65c09ea508414b6cd55b822a",
                  name: "현금",
                  groupId: "65b73d1d95fd2333931df1a2",
                  status: "ACTIVE",
                  createdAt: "2024-02-05T08:39:01.783Z",
                  updatedAt: "2024-02-05T10:23:05.657Z",
                  __v: 0,
                },
              ],
            },
          });
        },
      ),
    );

    expect(groupNameField).toHaveValue("훈님의 가계부2");
  });
});
