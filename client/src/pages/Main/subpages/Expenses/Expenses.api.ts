import { format } from "date-fns";
import { axiosInstance } from "../../../../global/axiosInstance";
import { ExpenseType } from "../../../../global/customType";

const expenseAPI = {
  async add({
    amounts,
    category,
    businessName,
    owner,
    currentGroupId,
    date,
    isRecurring,
  }: ExpenseType) {
    if (currentGroupId) {
      const response = await axiosInstance.post(
        `/expenses`,
        {
          amounts,
          category,
          businessName,
          owner,
          currentGroupId,
          date,
          isRecurring,
        },
        {
          withCredentials: true,
        },
      );
      //console.log(response);
      return response;
    }
  },

  async get({
    owner,
    currentGroupId,
    cursor,
    limit,
    period,
  }: {
    owner: string;
    currentGroupId: string;
    cursor: number;
    limit: number;
    period: Array<Date | undefined> | undefined;
  }) {
    if (currentGroupId) {
      const url = `/expenses?owner=${owner}&currentGroupId=${currentGroupId}&cursor=${cursor}&limit=${limit}&startDate=${period && period[0] && format(period[0], "yyyy-MM-dd")}&endDate=${period && period[1] && format(period[1], "yyyy-MM-dd")}`;
      const response = await axiosInstance.get(url);
      console.log(url);
      return { response, nextCursor: cursor + limit };
    }
  },

  async totalAmounts({
    owner,
    currentGroupId,
    period,
  }: {
    owner: string;
    currentGroupId: string;
    period?: Array<Date | undefined> | undefined;
  }) {
    if (currentGroupId) {
      const url = `/expenses/amounts?owner=${owner}&currentGroupId=${currentGroupId}&startDate=${period && period[0] && format(period[0], "yyyy-MM-dd")}&endDate=${period && period[1] && format(period[1], "yyyy-MM-dd")}`;
      const response = await axiosInstance.get(url);

      return response.data;
    }
  },

  async update({
    amounts,
    category,
    businessName,
    owner,
    date,
    isRecurring,
    expenseId,
  }: Omit<ExpenseType, "currentGroupId"> & { expenseId: string }) {
    const response = await axiosInstance.put(
      `/expenses/${expenseId}`,
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
    //console.log(response);
    return response;
  },

  async delete({ expenseId }: { expenseId: string }) {
    const response = await axiosInstance.delete(`/expenses/${expenseId}`, {
      withCredentials: true,
    });
    //console.log(response);
    return response;
  },
};

export default expenseAPI;
