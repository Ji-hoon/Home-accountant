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
    period: Array<Date>;
  }) {
    const response = await axiosInstance.get(
      `/expenses?owner=${owner}&cursor=${cursor}&limit=${limit}&startDate=${period && period[0] && format(period[0], "yyyy-MM-dd")}&endDate=${period && period[1] && format(period[1], "yyyy-MM-dd")}`,
    );
    console.log(
      `/expenses?owner=${owner}&cursor=${cursor}&limit=${limit}&startDate=${period && period[0] && format(period[0], "yyyy-MM-dd")}&endDate=${period && period[1] && format(period[1], "yyyy-MM-dd")}`,
    );
    // console.log("data: ", response.data);
    return { response, nextCursor: cursor + limit };
  },

  async totalAmounts({
    owner,
    period,
  }: {
    owner: string;
    period?: Array<Date | undefined> | undefined;
  }) {
    const response = await axiosInstance.get(
      `/expenses/amounts?owner=${owner}&startDate=${period && period[0] && format(period[0], "yyyy-MM-dd")}&endDate=${period && period[1] && format(period[1], "yyyy-MM-dd")}`,
    );
    //console.log("owner: ", owner, "data: ", response.data);
    return response.data;
  },
};

export default expenseAPI;
