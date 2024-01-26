import assetModel from "./asset.model.js";
import { AssetType, AssetUpdateType } from "../type/global.js";
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

    const result = await assetModel.aggregate([
      { $unwind: "$assetHistory" },
      {
        $match: {
          ...target,
          "assetHistory.date": {
            $gte: startDateFormat,
            $lte: endDateFormat,
          },
        },
      },
      {
        $group: {
          _id: "$_id",
          amounts: { $last: "$amounts" },
          name: { $last: "$name" },
          assetType: { $last: "$assetType" },
          owner: { $last: "$owner" },
          assetHistory: { $last: "$assetHistory" },
        },
      },
      { $sort: { "assetHistory.date": -1 } },
    ]);

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
          lastDate: { $first: "$assetHistory.date" },
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

  async updateAsset({
    amounts,
    name,
    assetType,
    owner,
    assetDate,
    assetId,
  }: AssetUpdateType) {
    const currentAmounts = await assetModel.findOne({ _id: assetId });
    const updatedModel = await assetModel.findByIdAndUpdate(
      { _id: assetId },
      {
        amounts,
        name,
        assetType,
        owner,
      },
      {
        new: true,
      },
    );

    if (updatedModel && updatedModel.amounts !== currentAmounts?.amounts) {
      updatedModel.assetHistory.push({ amounts, date: assetDate as Date });
      await updatedModel.save();
    }

    return updatedModel;
  },
};

export default assetService;
