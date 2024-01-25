import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import assetsAPI from "./Assets.api";
import { queryKeys } from "../../../../global/reactQuery";
import { endOfMonth, endOfYear, startOfMonth, startOfYear } from "date-fns";
import { TYPES } from "../../../../global/constants";
import { useEffect } from "react";

export function useAssets({
  owner,
  currentDate,
  unit,
}: {
  owner: string;
  currentDate: Date;
  unit: string;
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
        assetsAPI.totalAssetAmounts({ owner, period }),
        assetsAPI.get({ owner, period }),
      ]);
      return { amounts, assetResponse };
    },
  });

  const { data, refetch } = results;

  // const { data, refetch } = useSuspenseQuery({
  //   queryKey: [queryKeys.assetAmounts],
  //   queryFn: () => assetsAPI.totalAssetAmounts({
  //     owner,
  //     period,
  //   }),
  // });

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [owner, currentDate, unit]);

  const addAsset = useMutation({
    mutationFn: assetsAPI.add,
    onMutate: () => {
      //setisLoading(!isLoading);
    },
    onSuccess: () => {
      //console.log(data.data.message);
      //invalidateExpenseQuery();
      //refetch();
    },
    onError: (err) => {
      console.log(err);
    },
    onSettled: () => {
      //setisLoading(!isLoading);
    },
  }).mutateAsync;

  return { addAsset, data };
}
