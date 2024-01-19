import { useMutation, useSuspenseInfiniteQuery } from "@tanstack/react-query";
import expenseAPI from "./Expenses.api";
import { queryClient, queryKeys } from "../../../global/reactQuery";
import { useEffect } from "react";
import { ExpenseType, expenseQueryType } from "../../../global/customType";

export function useExpenses({ owner }: { owner: string }) {
  //TODO: 임시 변수 처리함. 추후 useSuspenseInfiniteQuery로 교체 시 수정 필요.
  //const cursor = 0;
  const limit = 10;

  const { data, refetch } = useSuspenseInfiniteQuery<expenseQueryType>({
    queryKey: [queryKeys.amounts],
    queryFn: async ({ pageParam }) => {
      const [amounts, expensesResponse] = await Promise.all([
        expenseAPI.totalAmounts({ owner }),
        expenseAPI.get({ owner, cursor: pageParam as number, limit }),
      ]);
      const expenses = expensesResponse.response.data as (ExpenseType & {
        _id: string;
      })[];
      const nextCursor = expensesResponse.nextCursor;
      return { amounts, expenses, nextCursor };
    },
    initialPageParam: 0,
    getNextPageParam: ({ expenses, nextCursor }) => {
      if (expenses.length === 0) return null;
      return nextCursor;
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

  return { addExpense, getExpense, ...data };
}
