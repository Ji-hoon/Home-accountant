import { categoryType, memberType } from "../global/customType";

export function covertToStringArray(
  baseArray: categoryType[] | memberType[],
  type: string,
) {
  //if (type === "name")
  return baseArray.map((item) => {
    if (type === "name") return (item as categoryType).name;
    else if (type === "nickname") return (item as memberType).nickname;
    return "";
  });
}
