import { axiosInstance } from "../../../global/axiosInstance";
import { ExpenseType } from "../../../global/customType";

const expenseAPI = {
  async add({
    amounts,
    category,
    businessName,
    owner,
    date,
    isRecurring,
  }: ExpenseType) {
    const response = await axiosInstance.post(
      `/expenses`,
      {
        amounts,
        category,
        businessName,
        owner,
        date,
        isRecurring,
      },
      {
        withCredentials: true,
      },
    );
    return response;
  },
};

export default expenseAPI;
