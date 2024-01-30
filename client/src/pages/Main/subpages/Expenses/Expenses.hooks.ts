import { useMutation, useSuspenseInfiniteQuery } from "@tanstack/react-query";
import expenseAPI from "./Expenses.api";
import { queryClient, queryKeys } from "../../../../global/reactQuery";
import { useEffect } from "react";
import { ExpenseType } from "../../../../global/customType";
import { useIntersectionObserver } from "../../../../components/hooks/useIntersectionObserver";
import { endOfMonth, endOfWeek, startOfMonth, startOfWeek } from "date-fns";
import { TYPES } from "../../../../global/constants";
import { useSetRecoilState } from "recoil";
import { selectedExpenseIdAtom } from "../../../../atoms/globalAtoms";

export function useExpenses({
  owner,
  currentDate,
  unit,
  currentGroupId,
}: {
  owner: string;
  currentDate: Date;
  unit: string;
  currentGroupId: string;
}) {
  const setSelectedExpenseId = useSetRecoilState(selectedExpenseIdAtom);
  let startDate;
  let endDate;

  if (unit === TYPES.TYPE_UNIT_WEEK) {
    startDate = startOfWeek(currentDate, { weekStartsOn: 1 });
    endDate = endOfWeek(currentDate, { weekStartsOn: 1 });
  } else if (unit === TYPES.TYPE_UNIT_MONTH) {
    startDate = startOfMonth(currentDate);
    endDate = endOfMonth(currentDate);
  }

  const period = [startDate, endDate];
  //console.log(startDate, endDate);

  const limit = 7; // 한 번에 불러올 지출 내역 목록 갯수

  const results = useSuspenseInfiniteQuery({
    queryKey: [queryKeys.expense],
    queryFn: async ({ pageParam }) => {
      const [amounts, expensesResponse] = await Promise.all([
        expenseAPI.totalAmounts({ owner, currentGroupId, period }),
        expenseAPI.get({
          owner,
          currentGroupId,
          cursor: pageParam as number,
          limit,
          period,
        }),
      ]);
      const expenses = expensesResponse?.response.data as (ExpenseType & {
        _id: string;
      })[];
      const nextCursor = expensesResponse?.nextCursor;
      return { amounts, expenses, nextCursor };
    },
    initialPageParam: 0,
    getNextPageParam: ({ expenses, nextCursor }) => {
      if (expenses?.length === 0) return null;
      return nextCursor;
    },
  });

  const { data, isError, refetch, fetchNextPage, hasNextPage } = results;

  const { setTarget } = useIntersectionObserver({
    onIntersect: fetchNextPage,
    shouldBeBlocked: !hasNextPage || isError,
  });

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [owner, currentDate, unit]);

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
      console.log(data?.data.message);
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

  const updateExpense = useMutation({
    mutationFn: expenseAPI.update,
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

  const deleteExpense = useMutation({
    mutationFn: expenseAPI.delete,
    onMutate: () => {
      //setisLoading(!isLoading);
    },
    onSuccess: () => {
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
      setSelectedExpenseId([]);
    },
  }).mutateAsync;

  return {
    addExpense,
    updateExpense,
    deleteExpense,
    ...data,
    setTarget,
    hasNextPage,
  };
}
