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
  async invite({ groupId, member }: { groupId: string; member: string }) {
    console.log(groupId, member);

    const url = `/groups/${groupId}/invite`;
    const response = await axiosInstance.put(
      url,
      {
        email: member, //TODO: 1명만 초대 발송으로 수정, 추후 n명 구현 필요
      },
      {
        withCredentials: true,
      },
    );
    return response;
  },
};

export default groupsAPI;
