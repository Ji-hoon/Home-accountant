import { axiosInstance } from "../../global/axiosInstance";

const assetTypeAPI = {
  async addAssetType({
    groupId,
    assetType,
  }: {
    groupId: string;
    assetType: string;
  }) {
    if (groupId) {
      const response = await axiosInstance.post(
        `/asset_types`,
        {
          groupId,
          name: assetType,
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
    const response = await axiosInstance.get(`/asset_types?groupId=${groupId}`);
    return response;
  },
};
export default assetTypeAPI;
