import { format } from "date-fns";
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

  async totalAssetAmounts({
    owner,
    period,
  }: {
    owner: string;
    period: Array<Date | undefined>;
  }) {
    const url = `/assets/amounts?owner=${owner}&startDate=${period[0] && format(period[0], "yyyy-MM-dd")}&endDate=${period[1] && format(period[1], "yyyy-MM-dd")}`;
    const response = await axiosInstance.get(url);
    console.log(url, response);

    return response.data;
  },
};

export default assetsAPI;
