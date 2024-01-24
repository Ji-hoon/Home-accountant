import { format } from "date-fns";
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
    period,
  }: {
    owner: string;
    cursor: number;
    limit: number;
    period: Array<Date | undefined> | undefined;
  }) {
    const url = `/expenses?owner=${owner}&cursor=${cursor}&limit=${limit}&startDate=${period && period[0] && format(period[0], "yyyy-MM-dd")}&endDate=${period && period[1] && format(period[1], "yyyy-MM-dd")}`;
    const response = await axiosInstance.get(url);
    console.log(url);
    return { response, nextCursor: cursor + limit };
  },

  async totalAmounts({
    owner,
    period,
  }: {
    owner: string;
    period?: Array<Date | undefined> | undefined;
  }) {
    const url = `/expenses/amounts?owner=${owner}&startDate=${period && period[0] && format(period[0], "yyyy-MM-dd")}&endDate=${period && period[1] && format(period[1], "yyyy-MM-dd")}`;
    const response = await axiosInstance.get(url);

    return response.data;
  },
};

export default expenseAPI;
