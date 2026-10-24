import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import assetTypeAPI from "./useAssetType.api";
import { useRecoilValue } from "recoil";
import { currentUserAtom } from "../../atoms/globalAtoms";
import { queryKeys } from "../../global/reactQuery";
import { AssetTypeType } from "../../global/customType";

export function useAssetType() {
  const currentUser = useRecoilValue(currentUserAtom);
  const results = useSuspenseQuery({
    queryKey: [queryKeys.assetTypes],
    queryFn: () => assetTypeAPI.get({ groupId: currentUser.currentGroup }),
  });

  const { data, refetch } = results;
  const assetTypes = data?.data.assetType as unknown as AssetTypeType[];
  // console.log(categories);

  const addAssetType = useMutation({
    mutationFn: assetTypeAPI.addAssetType,
    onMutate: () => {
      //setisLoading(!isLoading);
    },
    onSuccess: (data) => {
      console.log(data?.data.message);
      toast.success(data?.data.message);
      // invalidateExpenseQuery();
      refetch();
      // const newModalContent = {...dialog};
      // setDialog(() => newModalContent);
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

  return { addAssetType, assetTypes };
}
