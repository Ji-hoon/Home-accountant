/* eslint-disable @typescript-eslint/no-unused-vars */
import { http, HttpResponse, HttpHandler } from "msw";

export const handlers: HttpHandler[] = [
  http.get(
    `${import.meta.env.VITE_BACKEND_URL}/api/groups`,
    async ({ request }) => {
      const url = new URL(request.url);
      const code = url.searchParams.get("code");

      return HttpResponse.json({
        message: "그룹 조회에 성공했습니다.",
        groupInfo: {
          _id: "65b73d1d95fd2333931df1a2",
          name: "훈님의 가계부",
          members: [
            {
              userId: "65b73d1d95fd2333931df19f",
              role: "OWNER",
              joinedAt: "2024-01-29T05:52:29.299Z",
              _id: null,
            },
            {
              userId: "65bb868298f319869bedbee2",
              role: "MEMBER",
              joinedAt: "2024-02-01T14:22:12.819Z",
              _id: null,
            },
          ],
        },
      });
    },
  ),
  http.get(
    `${import.meta.env.VITE_BACKEND_URL}/api/groups/65b73d1d95fd2333931df1a2`,
    async () => {
      return HttpResponse.json({
        data: {
          data: {
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
          },
        },
      });
    },
  ),
  http.get(`${import.meta.env.VITE_BACKEND_URL}/api/expenses`, async () => {
    return HttpResponse.json([
      {
        _id: "65b9c7bc62cbeb63b583e64f",
        amounts: 27500,
        businessName: "컬리",
        date: new Date("2024-01-28T15:00:00.000Z").toISOString(), //"2024-01-28T15:00:00.000Z",
        isRecurring: "일시불",
        category: "식비",
        owner: "밀크티",
      },
    ]);
  }),
  http.get(
    `${import.meta.env.VITE_BACKEND_URL}/api/expenses/amounts`,
    async () => {
      return HttpResponse.json(27500);
    },
  ),
  http.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/kakao`, async () => {
    window.location.assign("/login");
    return;
  }),
];
