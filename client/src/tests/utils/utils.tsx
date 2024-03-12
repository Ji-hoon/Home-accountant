import userEvent, { UserEvent } from "@testing-library/user-event";
import { render, RenderResult } from "@testing-library/react";
import React, { Suspense } from "react";
import { RecoilRoot } from "recoil";
import { Routes, Route, RouterProvider } from "react-router";
import { createBrowserRouter, BrowserRouter as Router } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../../global/reactQuery";
import { LoaderWrapper } from "../../components/common/ApiBoundary";
import { Loader } from "rsuite";
import Header from "../../components/common/Header";

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
          <Suspense
            fallback={
              <LoaderWrapper>
                <Loader />
              </LoaderWrapper>
            }
          >
            <Router>
              <Routes>
                <Route path="*" element={<Header />} />
              </Routes>
            </Router>
            <RouterProvider router={router} />
          </Suspense>
        </RecoilRoot>
      </QueryClientProvider>,
    ),
    // to add provider try : render(jsx, { wrapper: provider });
  };
}
