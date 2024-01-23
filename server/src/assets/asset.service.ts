import assetModel from "./asset.model.js";
import { AssetType } from "../type/global.js";
import { ParsedQs } from "qs";
import { parse } from "date-fns";

const assetService = {
  async getAssets({
    owner,
    cursor,
    limit,
    startDate,
    endDate,
  }: {
    owner: string;
    cursor: number;
    limit: number;
    startDate: string | ParsedQs | undefined | string[] | ParsedQs[];
    endDate: string | ParsedQs | undefined | string[] | ParsedQs[];
  }) {
    const startDateFormat = parse(
      startDate as string,
      "yyyy-MM-dd",
      new Date(),
    );

    const endDateFormat = parse(endDate as string, "yyyy-MM-dd", new Date());

    const target = owner ? { owner: owner } : {};

    const result = await assetModel
      .find(
        {
          ...target,
          date: {
            //TODO: history안에 date를 조회해야 함
            $gte: startDateFormat,
            $lte: endDateFormat,
          },
        },
        {
          amounts: 1,
          name: 1,
          assetType: 1,
          owner: 1,
          history: 1,
          _id: 1,
        },
      )
      .skip(cursor)
      .limit(limit)
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
    const startDateFormat = parse(
      startDate as string,
      "yyyy-MM-dd",
      new Date(),
    );

    const endDateFormat = parse(endDate as string, "yyyy-MM-dd", new Date());

    const target = owner
      ? {
          owner: owner,
          date: {
            $gte: startDateFormat,
            $lte: endDateFormat,
          },
        }
      : {
          date: {
            $gte: startDateFormat,
            $lte: endDateFormat,
          },
        };

    return await assetModel.aggregate([
      {
        $match: target,
      },
      {
        $group: {
          _id: null,
          totalAmounts: { $sum: "$amounts" },
        },
      },
    ]);
  },

  async addAsset({ amounts, name, assetType, owner, history }: AssetType) {
    const newAsset = {
      amounts,
      name,
      assetType,
      owner,
      history,
    };
    return await assetModel.create(newAsset);
  },
};

export default assetService;
