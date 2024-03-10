import userEvent, { UserEvent } from "@testing-library/user-event";
import { render, RenderResult } from "@testing-library/react";

import React from "react";
import { RecoilRoot } from "recoil";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../../global/reactQuery";

export function userEventSetup(
  renderTree: {
    path: string;
    jsx: React.ReactNode;
  }[],
): RenderResult & {
  user: UserEvent;
} {
  return {
    user: userEvent.setup(),
    ...render(
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <BrowserRouter>
            <Routes>
              {renderTree.map((element, index) => (
                <Route key={index} path={element.path} element={element.jsx} />
              ))}
            </Routes>
          </BrowserRouter>
        </RecoilRoot>
      </QueryClientProvider>,
    ),
    // to add provider try : render(jsx, { wrapper: provider });
  };
}
