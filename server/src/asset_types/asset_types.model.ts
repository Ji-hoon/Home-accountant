import { Schema, model } from "mongoose";
import { assetTypeSchemaType } from "../type/schema";

const AssetTypeSchema = new Schema<assetTypeSchemaType>(
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
  },
  {
    timestamps: true,
  },
);

const AssetTypeModel = model("asset_types", AssetTypeSchema);

export default AssetTypeModel;
