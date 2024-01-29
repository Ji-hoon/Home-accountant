import { axiosInstance } from "../../../../global/axiosInstance";

const groupsAPI = {
  async get(id: string) {
    const url = `/groups/${id}`;
    const response = await axiosInstance.get(url);
    //console.log(url);
    return response;
  },
};

export default groupsAPI;
