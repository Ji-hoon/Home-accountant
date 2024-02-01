import { axiosInstance } from "../../global/axiosInstance";

const invitationAPI = {
  async getGroupInfo(code: string) {
    const url = `/groups?code=${code}`;
    const response = await axiosInstance.get(url);
    return response.data;
  },
  async join({ groupId, userId }: { groupId: string; userId: string }) {
    const url = `/groups/${groupId}/members`;
    const response = await axiosInstance.put(
      url,
      {
        userId,
      },
      {
        withCredentials: true,
      },
    );
    return response.data;
  },
};

export default invitationAPI;
