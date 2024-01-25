import { ComputedDatum } from "@nivo/bar";
import { AssetType } from "../../../../../global/customType";

export type ChartData = {
  [key: string]: number;
};

interface AssetData {
  [key: string]: {
    owner: string;
    [key: string]: number | string;
  };
}

export function useChart({
  assetResponse,
}: {
  assetResponse: (AssetType & {
    _id: string;
  })[];
}) {
  function handleBarClick(
    datum: ComputedDatum<ChartData> & {
      color: string;
    },
  ) {
    console.log(datum);
  }

  function generateMonthlyAssetData() {
    const newAssetData = assetResponse.reduce(
      (
        acc: AssetData,
        asset: AssetType & {
          _id: string;
        },
      ) => {
        const { owner, name, assetType, amounts } = asset;
        if (!Object.prototype.hasOwnProperty.call(acc, owner)) {
          acc[owner] = { owner };
        }

        if (!Object.prototype.hasOwnProperty.call(acc[owner], name)) {
          acc[owner][`${name} (${assetType})`] = parseInt(amounts) / 100000;
        }

        return acc;
      },
      {},
    );

    const dataArray = Object.values(newAssetData);

    const keyArray: string[] = dataArray
      .map((data) => {
        return Object.keys(data).filter((key) => {
          return typeof data[key] === "number";
        });
      })
      .flat();

    const uniqueKeyArray: string[] = [...new Set(keyArray)];

    const resultArray = dataArray.length !== 0 ? dataArray : [];
    return { resultArray, uniqueKeyArray };
  }

  return { handleBarClick, generateMonthlyAssetData };
}
