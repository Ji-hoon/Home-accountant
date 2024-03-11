import "@testing-library/jest-dom";
import "@testing-library/react";

import { beforeEach, beforeAll, afterEach, afterAll } from "vitest";
import { server } from "./src/tests/mocks/server";

// establish API mocking before all tests
beforeAll(() => server.listen());

beforeEach(() => {
  Object.defineProperty(window, "location", {
    value: {
      origin: "http://localhost:3000",
      pathname: "/",
    },
  });
});

// reset any handlers that we may add during the tests.
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// clean up after the tests are finished.
afterAll(() => server.close());

// 테스트용 환경 변수 설정
// import dotenv from "dotenv";
// dotenv.config({ path: "./.env.test" });
