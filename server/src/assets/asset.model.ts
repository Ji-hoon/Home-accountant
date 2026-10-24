import { Schema, model } from "mongoose";
import { assetSchemaType } from "../type/schema";

const AssetSchema = new Schema<assetSchemaType>(
  {
    amounts: {
      required: true,
      type: Number,
    },
    name: {
      required: true,
      type: String,
    },
    assetType: {
      type: Schema.Types.ObjectId,
      ref: "categories",
    },
    owner: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    groupId: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "groups",
    },
    assetHistory: [
      {
        date: {
          required: true,
          type: Date,
        },
        amounts: {
          required: true,
          type: Number,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

const AssetModel = model("assets", AssetSchema);

export default AssetModel;
