import { Schema, model } from "mongoose";
import { categorySchemaType } from "../type/schema";

const CategorySchema = new Schema<categorySchemaType>(
  {
    name: {
      required: true,
      type: String,
    },
    groupId: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "groups",
    },
    status: {
      required: true,
      default: "ACTIVE",
      type: String,
    },
    type: {
      default: "",
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const CategoryModel = model("category", CategorySchema);

export default CategoryModel;
