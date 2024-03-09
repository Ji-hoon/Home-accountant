import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// import Login from "../pages/Login/LoginPage";
// import { LABELS } from "../global/constants";
import App from "../App";
import { RecoilRoot } from "recoil";

test("order phases for happy path", async () => {
  userEvent.setup();
  render(
    <RecoilRoot>
      <App />
    </RecoilRoot>,
  );
  const heading = screen.getByRole("heading", {
    name: /지출 내역/i,
  });

  expect(heading).toBeInTheDocument();
});

test("init", () => {});
