import { axiosInstance } from "../../global/axiosInstance";

const invitationAPI = {
  async getGroupInfo(code: string) {
    const url = `/groups?code=${code}`;
    const response = await axiosInstance.get(url);
    return response.data;
  },
};

export default invitationAPI;
