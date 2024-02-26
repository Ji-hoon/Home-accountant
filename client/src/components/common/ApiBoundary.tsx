import { ReactNode, Suspense } from "react";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import ApiErrorFallback, { ErrorFallback } from "./ApiErrorFallback";
import { Loader } from "rsuite";
import styled from "styled-components";
import { COLORS, SIZES } from "../../global/constants";

export default function ApiBoundary({ children }: { children: ReactNode }) {
  return (
    <>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <>
            <ErrorBoundary FallbackComponent={ApiErrorFallback} onReset={reset}>
              <Suspense
                fallback={
                  <LoaderWrapper>
                    <Loader />
                  </LoaderWrapper>
                }
              >
                {children}
              </Suspense>
            </ErrorBoundary>
          </>
        )}
      </QueryErrorResetBoundary>
    </>
  );
}

const LoaderWrapper = styled(ErrorFallback)`
  background-color: ${COLORS.GRAY_01_OVERAY};

  & .rs-loader-spin {
    width: ${SIZES.XXL}px;
    height: ${SIZES.XXL}px;

    &::before,
    &::after {
      width: inherit;
      height: inherit;
      border-color: ${COLORS.GRAY_01_OVERAY};
    }
    &:after {
      border-color: ${COLORS.GRAY_07_OVERAY} transparent transparent;
    }
  }
`;
