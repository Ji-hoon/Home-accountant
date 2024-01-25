import { ComputedDatum } from "@nivo/bar";
import { AssetType } from "../../../../global/customType";

export type ChartData = {
  owner: string;
  현금: number;
  주식: number;
  부동산: number;
  비트코인: number;
};

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
    console.log(assetResponse);
    return assetResponse;
  }

  return { handleBarClick, generateMonthlyAssetData };
}
