import CategoryModel from "./categories.model.js";
import { CategoryType } from "../type/global.js";
import { ParsedQs } from "qs";

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
  async updateCategory({
    categoryId,
    name,
    groupId,
    type,
  }: CategoryType & { categoryId: string }) {
    const categoryInfo = {
      name,
      groupId,
      type,
    };

    return await CategoryModel.findOneAndUpdate(
      {
        _id: categoryId,
      },
      categoryInfo,
      {
        new: true,
      },
    );
  },
  async getGroupCategory({
    groupId,
  }: {
    groupId: string | string[] | ParsedQs | ParsedQs[];
  }) {
    if (groupId) {
      const target = {
        groupId,
      };

      return await CategoryModel.find(target);
    }

    return [];
  },
};

export default categoriesService;
