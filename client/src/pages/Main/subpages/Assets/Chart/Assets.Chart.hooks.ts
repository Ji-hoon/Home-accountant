import { ComputedDatum } from "@nivo/bar";
import { AssetType, dialogLayoutType } from "../../../../../global/customType";
import { useHandleDialog } from "../../../../../components/hooks/useHandleDialog";
import { LABELS, TYPES } from "../../../../../global/constants";
import { EditAssetLayout } from "../../../../../global/layout";

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
  const { showDialog } = useHandleDialog();

  function handleBarClick(
    datum: ComputedDatum<ChartData> & {
      color: string;
    },
  ) {
    console.log(datum);
    showDialog({
      type: TYPES.MODAL_SINGLE_COL,
      title: LABELS.LABEL_EDIT_ASSET,
      layout: EditAssetLayout({
        owner: datum.indexValue as string,
        name: datum.id as string,
        amounts: datum.value as number,
      }) as dialogLayoutType[],
    });
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

    const dataArray = Object.values(newAssetData).sort((a, b) => {
      if (a.owner < b.owner) {
        return -1;
      }
      if (a.owner > b.owner) {
        return 1;
      }
      return 0;
    });

    const keyArray: string[] = dataArray
      .map((data) => {
        return Object.keys(data).filter((key) => {
          return typeof data[key] === "number";
        });
      })
      .flat();

    const uniqueKeyArray: string[] = [...new Set(keyArray)].sort((a, b) => {
      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
      return 0;
    });

    const resultArray = dataArray.length !== 0 ? dataArray : [];
    return { resultArray, uniqueKeyArray };
  }

  return { handleBarClick, generateMonthlyAssetData };
}
