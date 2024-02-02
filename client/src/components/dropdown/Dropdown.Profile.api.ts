import { axiosInstance } from "../../global/axiosInstance";

const profileAPI = {
  async getGroupInfo(id: string) {
    const url = `/users/${id}/groups`;
    const response = await axiosInstance.get(url);
    return response;
  },
};

export default profileAPI;
