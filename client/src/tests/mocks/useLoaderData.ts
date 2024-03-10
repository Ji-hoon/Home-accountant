import { vi } from "vitest";

export const mockUserLoaderData = vi.fn().mockReturnValue({
  result: {
    userId: "65b73d1d95fd2333931df19f",
    nickname: "테스터",
    profile: "/img-default-profile.png",
    currentGroup: "65b73d1d95fd2333931df1a2",
    currentRole: "OWNER",
  },
});
