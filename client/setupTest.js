import "@testing-library/jest-dom";
import "@testing-library/react";

import { cleanup } from "@testing-library/react";
import { beforeEach, beforeAll, afterEach, afterAll, vi } from "vitest";
import { server } from "./src/tests/mocks/server";

// establish API mocking before all tests
beforeAll(() => server.listen());

beforeEach(() => {
  cleanup();

  // test 시작 시 마다 경로 reset
  Object.defineProperty(window, "location", {
    value: {
      origin: "http://localhost:3000",
      pathname: "/",
    },
  });

  // TODO : 임시로 null로 전환한 IntersectionObserver를 동작하게끔 수정
  const mockIntersectionObserver = vi.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });
  window.IntersectionObserver = mockIntersectionObserver;
});

// reset any handlers that we may add during the tests.
// so they don't affect other tests.
afterEach(() => {
  server.resetHandlers();
  cleanup();
});

// clean up after the tests are finished.
afterAll(() => server.close());

// 테스트용 환경 변수 설정
// import dotenv from "dotenv";
// dotenv.config({ path: "./.env.test" });
