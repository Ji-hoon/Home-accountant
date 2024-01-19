import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import expenseAPI from "./Expenses.api";
import { queryClient, queryKeys } from "../../../global/reactQuery";
import { useEffect } from "react";

export function useExpenses({ owner }: { owner: string }) {
  const { data, refetch } = useSuspenseQuery<number>({
    queryKey: [queryKeys.amounts],
    queryFn: () => expenseAPI.totalAmounts({ owner }),
  });

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [owner]);

  const invalidateExpenseQuery = () => {
    queryClient.invalidateQueries({
      queryKey: [queryKeys.expense],
    });
  };

  const addExpense = useMutation({
    mutationFn: expenseAPI.add,
    onMutate: () => {
      //setisLoading(!isLoading);
    },
    onSuccess: (data) => {
      console.log(data.data.message);
      invalidateExpenseQuery();
    },
    onError: (err) => {
      console.log(err);
      // toast.error(
      //   err instanceof AxiosError ? err.response?.data.error : "unknown error",
      // );
    },
    onSettled: () => {
      //setisLoading(!isLoading);
    },
  }).mutateAsync;

  const getExpense = useMutation({
    //mutationFn: expenseAPI.get,
    onMutate: () => {
      //setisLoading(!isLoading);
    },
    onSuccess: () => {
      //console.log(data.data.message);
    },
    onError: (err) => {
      console.log(err);
    },
    onSettled: () => {
      //setisLoading(!isLoading);
    },
  }).mutateAsync;

  return { addExpense, getExpense, data };
}
