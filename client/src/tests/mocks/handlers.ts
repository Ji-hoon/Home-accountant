import { http, HttpResponse, HttpHandler } from "msw";

export const handlers: HttpHandler[] = [
  http.get("http://localhost:5001/api/groups", async ({ request }) => {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");
    if (code === "null") {
      return HttpResponse.json([
        {
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
        },
      ]);
    }
  }),
];
