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
  expenseAmounts: "EXPENSE_AMOUNTS",
  assetAmounts: "ASSET_AMOUNTS",
  assetTypes: "ASSET_TYPES",
  currentGroup: "GROUP",
  currentUser: "USER",
  invitation: "INVITATION",
  expenseCategory: "EXPENSE_CATEGORY",
};
