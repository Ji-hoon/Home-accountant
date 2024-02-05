import { categoryType, memberType } from "../global/customType";

export function covertToStringArray(
  baseArray: categoryType[] | memberType[],
  type: string,
) {
  if (type === "name")
    return baseArray.map((item) => (item as categoryType)[type]);
  if (type === "nickname")
    return baseArray.map((item) => (item as memberType)[type]);
  return [""];
}
