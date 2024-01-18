import { QueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
    },
    mutations: {
      throwOnError: (err) =>
        err instanceof AxiosError && err.response?.status == 401,
    },
  },
});

//TODO : 사용하는 queryKey로만 정리
export const queryKeys = {
  expense: "EXPENSE",
};
