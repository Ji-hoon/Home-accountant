import { categoryType, memberType, AssetTypeType } from "../global/customType";

export function covertToStringArray(
  baseArray: categoryType[] | memberType[] | AssetTypeType[],
  type: string,
) {
  //if (type === "name")
  return baseArray.map((item) => {
    if (type === "name")
      return `${(item as categoryType).name}_${(item as categoryType)._id}`;
    else if (type === "nickname")
      return `${(item as memberType).nickname}_${(item as memberType).userId}`;
    else if (type === "assetType")
      return `${(item as AssetTypeType).name}_${(item as AssetTypeType)._id}`;
    return "";
  });
}
