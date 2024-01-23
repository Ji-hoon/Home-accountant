import { useMutation } from "@tanstack/react-query";
import assetsAPI from "./Assets.api";

export function useAssets() {
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

  return { addAsset };
}
