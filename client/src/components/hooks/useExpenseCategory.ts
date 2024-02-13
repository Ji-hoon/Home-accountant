import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import expenseCategoryAPI from "./useExpenseCategory.api";
import { useRecoilValue } from "recoil";
import { currentUserAtom } from "../../atoms/globalAtoms";
import { queryKeys } from "../../global/reactQuery";
import { categoryType } from "../../global/customType";
// import groupsAPI from "../../pages/Main/subpages/Group/Group.api";

export function useExpenseCategory() {
  const currentUser = useRecoilValue(currentUserAtom);
  // const [dialog, setDialog] = useRecoilState(currentDialogAtom);
  const results = useSuspenseQuery({
    queryKey: [queryKeys.expenseCategory],
    queryFn: () =>
      expenseCategoryAPI.get({ groupId: currentUser.currentGroup }),
  });

  const { data, refetch } = results;
  const categories = data?.data.category as unknown as categoryType[];
  // console.log(categories);

  const addExpenseCategory = useMutation({
    mutationFn: expenseCategoryAPI.addCategory,
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

  return { addExpenseCategory, categories };
}
