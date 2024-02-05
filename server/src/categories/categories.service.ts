import CategoryModel from "./categories.model.js";
import { CategoryType } from "../type/global.js";

const categoriesService = {
  async addCategory({ name, groupId, type }: CategoryType) {
    const newCategory = {
      name,
      groupId,
      type, // "FOOD" | "CULTURE" | ...
      status: "ACTIVE", // "ACTIVE" | "INACTIVE" | ...
    };
    return await CategoryModel.create(newCategory);
  },
};

export default categoriesService;
