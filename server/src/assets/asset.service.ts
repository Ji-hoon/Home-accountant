import assetModel from "./asset.model.js";
import { AssetType, AssetUpdateType } from "../type/global.js";
import { ParsedQs } from "qs";
import { parseStringyyyyMMddToDate } from "../utils/parseDate.js";
import { CustomError } from "../middleware/errorHandler.js";
import { Types } from "mongoose";
const ObjectId = Types.ObjectId;

const assetService = {
  async getAssets({
    owner,
    groupId,
    startDate,
    endDate,
  }: {
    owner: string;
    groupId: string | ParsedQs | string[] | ParsedQs[] | undefined;
    startDate: string | ParsedQs | undefined | string[] | ParsedQs[];
    endDate: string | ParsedQs | undefined | string[] | ParsedQs[];
  }) {
    const startDateFormat = parseStringyyyyMMddToDate(startDate as string);
    const endDateFormat = parseStringyyyyMMddToDate(endDate as string);

    const target = owner
      ? {
          owner: owner,
          groupId: new ObjectId(groupId as string),
        }
      : {
          groupId: new ObjectId(groupId as string),
        };

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
    groupId,
    startDate,
    endDate,
  }: {
    owner?: string;
    groupId: string | ParsedQs | string[] | ParsedQs[] | undefined;
    startDate: string | ParsedQs | undefined | string[] | ParsedQs[];
    endDate: string | ParsedQs | undefined | string[] | ParsedQs[];
  }) {
    const startDateFormat = parseStringyyyyMMddToDate(startDate as string);
    const endDateFormat = parseStringyyyyMMddToDate(endDate as string);

    const target = owner
      ? {
          owner: owner,
          groupId: new ObjectId(groupId as string),
        }
      : {
          groupId: new ObjectId(groupId as string),
        };

    return await assetModel.aggregate([
      {
        $match: target,
      },
      {
        $project: {
          totalAmounts: {
            $reduce: {
              input: {
                $filter: {
                  input: "$assetHistory",
                  as: "history",
                  cond: {
                    $and: [
                      { $gte: ["$$history.date", startDateFormat] },
                      { $lte: ["$$history.date", endDateFormat] },
                    ],
                  },
                },
              },
              initialValue: 0,
              in: {
                $cond: [
                  { $eq: ["$$this", { $arrayElemAt: ["$assetHistory", -1] }] },
                  { $add: ["$$value", "$$this.amounts"] },
                  "$$value",
                ],
              },
            },
          },
        },
      },
    ]);
  },

  async addAsset({
    amounts,
    name,
    assetType,
    owner,
    groupId,
    assetHistory,
  }: AssetType) {
    const newAsset = {
      amounts,
      name,
      assetType,
      owner,
      groupId,
      assetHistory,
    };
    const asset = await assetModel.findOne({
      owner: owner,
      assetType: assetType,
    });

    if (asset) {
      //TODO: controller로 에러 처리 이관 필요
      throw new CustomError({
        status: 400,
        message: "동일한 타입의 자산은 1개만 생성할 수 있습니다.",
      });
    }
    return await assetModel.create(newAsset);
  },

  async updateAsset({
    amounts,
    name,
    assetType,
    owner,
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
      updatedModel.assetHistory.push({
        amounts,
        date: new Date(),
        _id: null,
      });
      await updatedModel.save();
    }

    return updatedModel;
  },
};

export default assetService;
