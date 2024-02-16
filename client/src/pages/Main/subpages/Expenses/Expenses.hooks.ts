import { useMutation, useSuspenseInfiniteQuery } from "@tanstack/react-query";
import expenseAPI from "./Expenses.api";
import { queryClient, queryKeys } from "../../../../global/reactQuery";
import { useEffect } from "react";
import { ExpenseType } from "../../../../global/customType";
import { useIntersectionObserver } from "../../../../components/hooks/useIntersectionObserver";
import { endOfMonth, endOfWeek, startOfMonth, startOfWeek } from "date-fns";
import { TYPES } from "../../../../global/constants";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  currentDateAtom,
  dateUnitAtom,
  selectedExpenseIdAtom,
  currentOwnerAtom,
} from "../../../../atoms/globalAtoms";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

export function useExpenses() {
  const currentDate = useRecoilValue(currentDateAtom);
  const dateUnit = useRecoilValue(dateUnitAtom);
  const currentOwner = useRecoilValue(currentOwnerAtom);
  const currentUser = localStorage.getItem("currentUser");
  const currentGroupId = currentUser && JSON.parse(currentUser).currentGroup;

  const [selectedExpenseId, setSelectedExpenseId] = useRecoilState(
    selectedExpenseIdAtom,
  );
  let startDate;
  let endDate;

  if (dateUnit === TYPES.TYPE_UNIT_WEEK) {
    startDate = startOfWeek(currentDate, { weekStartsOn: 1 });
    endDate = endOfWeek(currentDate, { weekStartsOn: 1 });
  } else if (dateUnit === TYPES.TYPE_UNIT_MONTH) {
    startDate = startOfMonth(currentDate);
    endDate = endOfMonth(currentDate);
  }

  const period = [startDate, endDate];
  console.log("expense hook");

  const limit = 7; // 한 번에 불러올 지출 내역 목록 갯수

  const results = useSuspenseInfiniteQuery({
    queryKey: [queryKeys.expense],
    queryFn: async ({ pageParam }) => {
      const [amounts, expensesResponse] = await Promise.all([
        expenseAPI.totalAmounts({
          owner: currentOwner,
          currentGroupId,
          period,
        }),
        expenseAPI.get({
          owner: currentOwner,
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

  // console.log(results.fetchStatus);
  const {
    data,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    fetchStatus,
    isFetchingNextPage,
  } = results;

  const { setTarget } = useIntersectionObserver({
    onIntersect: fetchNextPage,
    shouldBeBlocked: !hasNextPage || isError,
  });

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentOwner, currentDate, dateUnit]);

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
      toast.success(data?.data.message);
      invalidateExpenseQuery();
      refetch();
    },
    onError: (err) => {
      console.log(err);
      toast.error(
        err instanceof AxiosError ? err.response?.data.error : "unknown error",
      );
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
      toast.success(data.data.message);
      invalidateExpenseQuery();
      refetch();
    },
    onError: (err) => {
      console.log(err);
      toast.error(
        err instanceof AxiosError ? err.response?.data.error : "unknown error",
      );
    },
    onSettled: () => {
      //setisLoading(!isLoading);
    },
  }).mutateAsync;

  const deleteExpense = useMutation({
    mutationFn: async () => {
      const response = await Promise.all(
        selectedExpenseId.map((id) => expenseAPI.delete({ expenseId: id })),
      );
      console.log(response);
      return response.filter((result) => result.status === 204);
    },
    onMutate: () => {
      //setisLoading(!isLoading);
    },
    onSuccess: () => {
      invalidateExpenseQuery();
      refetch();
      toast.success("지출 내역을 삭제했습니다.");
    },
    onError: (err) => {
      console.log(err);
      toast.error(
        err instanceof AxiosError ? err.response?.data.error : "unknown error",
      );
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
    fetchStatus,
    isFetchingNextPage,
  };
}
