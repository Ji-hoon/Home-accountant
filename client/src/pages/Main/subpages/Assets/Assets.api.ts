import { format } from "date-fns";
import { axiosInstance } from "../../../../global/axiosInstance";
import { AssetType, AssetUpdateType } from "../../../../global/customType";

const assetsAPI = {
  async add({
    amounts,
    name,
    owner,
    currentGroupId,
    assetType,
    assetHistory,
  }: AssetType) {
    const response = await axiosInstance.post(
      `/assets`,
      {
        amounts,
        name,
        owner,
        currentGroupId,
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
    currentGroupId,
    period,
  }: {
    owner: string;
    currentGroupId: string;
    period: Array<Date | undefined>;
  }) {
    if (currentGroupId) {
      const url = `/assets/amounts?owner=${owner}&currentGroupId=${currentGroupId}&startDate=${period[0] && format(period[0], "yyyy-MM-dd")}&endDate=${period[1] && format(period[1], "yyyy-MM-dd")}`;
      const response = await axiosInstance.get(url);

      return response.data;
    }
  },

  async get({
    owner,
    currentGroupId,
    period,
  }: {
    owner: string;
    currentGroupId: string;
    period: Array<Date | undefined>;
  }) {
    if (currentGroupId) {
      const url = `/assets?owner=${owner}&currentGroupId=${currentGroupId}&startDate=${period[0] && format(period[0], "yyyy-MM-dd")}&endDate=${period[1] && format(period[1], "yyyy-MM-dd")}`;
      const response = await axiosInstance.get(url);

      return response.data;
    }
  },

  async update({
    amounts,
    name,
    owner,
    assetType,
    assetId,
    assetDate,
  }: AssetUpdateType) {
    const response = await axiosInstance.put(
      `/assets/${assetId}`,
      {
        amounts,
        name,
        owner,
        assetType,
        assetDate,
      },
      {
        withCredentials: true,
      },
    );
    console.log(response);
    return response;
  },
};

export default assetsAPI;
