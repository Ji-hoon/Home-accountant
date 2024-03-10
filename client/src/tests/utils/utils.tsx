import userEvent, { UserEvent } from "@testing-library/user-event";
import { render, RenderResult } from "@testing-library/react";
import React from "react";
import { RecoilRoot } from "recoil";
import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../../global/reactQuery";

export function userEventSetup(
  renderTree: {
    path: string;
    jsx: React.ReactNode;
  }[],
  // eslint-disable-next-line @typescript-eslint/ban-types
  loader: () => {},
): RenderResult & {
  user: UserEvent;
} {
  const renderTreeArray = renderTree.map((tree) => {
    return {
      path: tree.path,
      loader: loader,
      element: tree.jsx,
    };
  });
  const router = createBrowserRouter(renderTreeArray);

  return {
    user: userEvent.setup(),
    ...render(
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <RouterProvider router={router} />
        </RecoilRoot>
      </QueryClientProvider>,
    ),
    // to add provider try : render(jsx, { wrapper: provider });
  };
}
