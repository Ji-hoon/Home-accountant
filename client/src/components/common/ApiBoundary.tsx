import { ReactNode, Suspense } from "react";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
//TODO: Loading, ErrorFallback 추후 구현
// import { Loading } from "./Loading/Loading";
// import ApiErrorFallback from "./ApiErrorFallback";

export default function ApiBoundary({ children }: { children: ReactNode }) {
  return (
    <>
      <QueryErrorResetBoundary>
        <Suspense fallback={<></>}>{children}</Suspense>
      </QueryErrorResetBoundary>
    </>
  );
}
