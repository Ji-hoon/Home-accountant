import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import assetsAPI from "./Assets.api";
import { queryClient, queryKeys } from "../../../../global/reactQuery";
import { endOfMonth, endOfYear, startOfMonth, startOfYear } from "date-fns";
import { TYPES } from "../../../../global/constants";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

export function useAssets({
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
  let startDate;
  let endDate;

  if (unit === TYPES.TYPE_UNIT_YEAR) {
    startDate = startOfYear(currentDate);
    endDate = endOfYear(currentDate);
  } else if (unit === TYPES.TYPE_UNIT_MONTH) {
    startDate = startOfMonth(currentDate);
    endDate = endOfMonth(currentDate);
  }

  const period = [startDate, endDate];

  const results = useSuspenseQuery({
    queryKey: [queryKeys.assetAmounts],
    queryFn: async () => {
      const [amounts, assetResponse] = await Promise.all([
        assetsAPI.totalAssetAmounts({ owner, currentGroupId, period }),
        assetsAPI.get({ owner, currentGroupId, period }),
      ]);
      return { amounts, assetResponse };
    },
  });

  const { data, refetch, fetchStatus } = results;

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [owner, currentDate, unit]);

  const invalidateExpenseQuery = () => {
    queryClient.invalidateQueries({
      queryKey: [queryKeys.assetAmounts],
    });
  };

  const addAsset = useMutation({
    mutationFn: assetsAPI.add,
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

  const updateAsset = useMutation({
    mutationFn: assetsAPI.update,
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

  return { addAsset, updateAsset, data, fetchStatus };
}
