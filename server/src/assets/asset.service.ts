import assetModel from "./asset.model.js";
import { AssetType } from "../type/global.js";
import { ParsedQs } from "qs";
import { parseStringyyyyMMddToDate } from "../utils/parseDate.js";

const assetService = {
  async getAssets({
    owner,
    startDate,
    endDate,
  }: {
    owner: string;
    startDate: string | ParsedQs | undefined | string[] | ParsedQs[];
    endDate: string | ParsedQs | undefined | string[] | ParsedQs[];
  }) {
    const startDateFormat = parseStringyyyyMMddToDate(startDate as string);
    const endDateFormat = parseStringyyyyMMddToDate(endDate as string);

    const target = owner ? { owner: owner } : {};

    const result = await assetModel
      .find(
        {
          ...target,
          date: {
            //TODO: assetHistory date를 조회해야 함
            $gte: startDateFormat,
            $lte: endDateFormat,
          },
        },
        {
          amounts: 1,
          name: 1,
          assetType: 1,
          owner: 1,
          assetHistory: 1,
          _id: 1,
        },
      )
      .sort({ date: -1 }); //TODO: 이것도 history안에 date 기준으로..

    return result;
  },

  async getAssetsByOption({
    //TODO: 추후 owner가 아닌 group으로도 조회 가능하게 변경
    owner,
    startDate,
    endDate,
  }: {
    owner?: string;
    startDate: string | ParsedQs | undefined | string[] | ParsedQs[];
    endDate: string | ParsedQs | undefined | string[] | ParsedQs[];
  }) {
    const startDateFormat = parseStringyyyyMMddToDate(startDate as string);
    const endDateFormat = parseStringyyyyMMddToDate(endDate as string);

    console.log(startDateFormat, endDateFormat);
    const target = owner
      ? {
          owner: owner,
        }
      : {};

    return await assetModel.aggregate([
      {
        $match: target,
      },
      {
        $unwind: "$assetHistory",
      },
      {
        $match: {
          "assetHistory.date": {
            $gte: startDateFormat,
            $lte: endDateFormat,
          },
        },
      },
      {
        $group: {
          _id: null,
          totalAmounts: { $sum: "$assetHistory.amounts" },
          lastAmounts: { $last: "$assetHistory.amounts" },
        },
      },
      {
        $project: {
          _id: 0,
          totalAmounts: 1,
          lastAmounts: 1,
        },
      },
    ]);
  },

  async addAsset({ amounts, name, assetType, owner, assetHistory }: AssetType) {
    const newAsset = {
      amounts,
      name,
      assetType,
      owner,
      assetHistory,
    };
    return await assetModel.create(newAsset);
  },
};

export default assetService;
