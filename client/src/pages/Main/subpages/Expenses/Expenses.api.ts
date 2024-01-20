import { axiosInstance } from "../../../../global/axiosInstance";
import { ExpenseType } from "../../../../global/customType";

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

  async get({
    owner,
    cursor,
    limit,
  }: {
    owner: string;
    cursor: number;
    limit: number;
  }) {
    const response = await axiosInstance.get(
      `/expenses?owner=${owner}&cursor=${cursor}&limit=${limit}`,
    );
    //console.log("data: ", response.data);
    return { response, nextCursor: cursor + limit };
  },

  async totalAmounts({ owner }: { owner: string }) {
    const response = await axiosInstance.get(
      `/expenses/amounts?owner=${owner}`,
    );
    //console.log("owner: ", owner, "data: ", response.data);
    return response.data;
  },
};

export default expenseAPI;
