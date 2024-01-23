import { axiosInstance } from "../../../../global/axiosInstance";
import { AssetType } from "../../../../global/customType";

const assetsAPI = {
  async add({ amounts, name, owner, assetType, assetHistory }: AssetType) {
    console.log({
      amounts,
      name,
      owner,
      assetType,
      assetHistory,
    });
    const response = await axiosInstance.post(
      `/assets`,
      {
        amounts,
        name,
        owner,
        assetType,
        assetHistory,
      },
      {
        withCredentials: true,
      },
    );
    return response;
  },
};

export default assetsAPI;
