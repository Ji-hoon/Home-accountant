/* eslint-disable @typescript-eslint/no-unused-vars */
import { http, HttpResponse, HttpHandler } from "msw";

export const handlers: HttpHandler[] = [
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

  http.get(`${import.meta.env.VITE_BACKEND_URL}/api/groups/null`, async () => {
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
  }),

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
              // userId: "65b73d1d95fd2333931df19f",
              // role: "OWNER",
              // joinedAt: "2024-01-29T05:52:29.299Z",
              // _id: null,
              userId: "65b73d1d95fd2333931df19f",
              nickname: "훈",
              profileImgUrl:
                "http://k.kakaocdn.net/dn/CjcgX/btsDqiDbLki/lAvaEBFFs9qcewizh6zLEK/img_640x640.jpg",
              role: "OWNER",
              joinedAt: "2024-01-29T05:52:29.299Z",
            },
          ],
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
      return HttpResponse.json(27500);
    },
  ),
  http.get(`${import.meta.env.VITE_BACKEND_URL}/api/categories`, async () => {
    return HttpResponse.json({
      message: "카테고리 조회에 성공했습니다.",
      category: [
        {
          _id: "65de85c3004d3cec9ede0f33",
          name: "식비",
          groupId: "65dde57efb22f9ca66dee948",
          status: "ACTIVE",
          type: "FOOD",
          createdAt: "2024-02-28T01:00:51.229Z",
          updatedAt: "2024-02-28T01:00:51.229Z",
          __v: 0,
        },
      ],
    });
  }),

  http.get(
    `${import.meta.env.VITE_BACKEND_URL}/api/assets/amounts`,
    async () => {
      return HttpResponse.json(6800000);
    },
  ),
  http.get(`${import.meta.env.VITE_BACKEND_URL}/api/assets`, async () => {
    return HttpResponse.json([
      {
        _id: "65b1fbcbabd718a8d985615f",
        amounts: 6800000,
        name: "타이거 주식",
        assetHistory: {
          date: new Date("2024-01-24T15:00:00.000Z").toISOString(),
          amounts: 6800000,
          _id: null,
        },
        assetType: "주식",
        owner: "훈",
      },
    ]);
  }),
  http.get(`${import.meta.env.VITE_BACKEND_URL}/api/asset_types`, async () => {
    return HttpResponse.json([]);
  }),
  // http.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/kakao`, async () => {
  //   window.location.assign("/login");
  //   return;
  // }),
];
