import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import expenseAPI from "./Expenses.api";
import { queryClient, queryKeys } from "../../../global/reactQuery";
import { useEffect } from "react";
import { ExpenseType, expenseQueryType } from "../../../global/customType";

export function useExpenses({ owner }: { owner: string }) {
  //임시 변수
  const cursor = 0;
  const limit = 99;

  const { data, refetch } = useSuspenseQuery<expenseQueryType>({
    queryKey: [queryKeys.amounts],
    queryFn: async () => {
      const [amounts, expensesResponse] = await Promise.all([
        expenseAPI.totalAmounts({ owner }),
        expenseAPI.get({ owner, cursor, limit }),
      ]);
      const expenses = expensesResponse.data as (ExpenseType & {
        _id: string;
      })[];
      return { amounts, expenses };
    },
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
      refetch();
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
