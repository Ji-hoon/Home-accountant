import { axiosInstance } from "../../global/axiosInstance";

const expenseCategoryAPI = {
  async addCategory({
    groupId,
    category,
  }: {
    groupId: string;
    category: string;
  }) {
    if (groupId) {
      const response = await axiosInstance.post(
        `/categories`,
        {
          groupId,
          name: category,
        },
        {
          withCredentials: true,
        },
      );
      //console.log(response);
      return response;
    }
  },
  async get({ groupId }: { groupId: string }) {
    const response = await axiosInstance.get(`/categories?groupId=${groupId}`);
    return response;
  },
};
export default expenseCategoryAPI;
