import { axiosInstance } from "../../../../global/axiosInstance";

const groupsAPI = {
  async get(id: string) {
    const url = `/groups/${id}`;
    const response = await axiosInstance.get(url);
    //console.log(url);
    return response;
  },
  async update({ id, name }: { id: string; name: string }) {
    const url = `/groups/${id}`;
    const response = await axiosInstance.put(
      url,
      {
        name,
      },
      {
        withCredentials: true,
      },
    );
    return response;
  },
};

export default groupsAPI;
