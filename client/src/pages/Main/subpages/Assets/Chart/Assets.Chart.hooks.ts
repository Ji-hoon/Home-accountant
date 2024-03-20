import { ComputedDatum } from "@nivo/bar";
import {
  AssetType,
  FormListLayoutType,
} from "../../../../../global/customType";
import { useHandleDialog } from "../../../../../components/hooks/useHandleDialog";
import { LABELS, TYPES, VALUES } from "../../../../../global/constants";
import { EditAssetLayout } from "../../../../../global/layout";

export type ChartData = {
  [key: string]: number | string;
};

interface AssetData {
  [key: string]: {
    owner: string;
    [key: string]: number | string | Date;
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
    showDialog({
      type: TYPES.MODAL_DOUBLE_COL,
      title: LABELS.LABEL_EDIT_ASSET,
      layout: EditAssetLayout({
        owner: datum.indexValue as string,
        name: datum.id as string,
        amounts: datum.value as number,
        data: datum.data,
      }) as FormListLayoutType[],
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
        const { owner, name, assetType, amounts, _id, assetHistory } = asset;
        if (!Object.prototype.hasOwnProperty.call(acc, owner)) {
          acc[owner] = { owner };
        }

        if (!Object.prototype.hasOwnProperty.call(acc[owner], name)) {
          acc[owner][`${name} (${assetType})`] =
            parseInt(amounts) / VALUES.ASSET_AMOUNTS_UNIT;
          acc[owner][`${assetType}_id`] = _id;
          acc[owner][`${assetType}_date`] = assetHistory.date;
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
