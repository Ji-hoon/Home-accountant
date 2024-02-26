import { ReactNode, Suspense } from "react";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import ApiErrorFallback from "./ApiErrorFallback";

export default function ApiBoundary({ children }: { children: ReactNode }) {
  return (
    <>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <>
            <ErrorBoundary FallbackComponent={ApiErrorFallback} onReset={reset}>
              <Suspense fallback={<></>}>{children}</Suspense>
            </ErrorBoundary>
          </>
        )}
      </QueryErrorResetBoundary>
    </>
  );
}
