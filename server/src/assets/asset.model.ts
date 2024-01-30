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
      type: String, //TODO: Schema.Types.ObjectId로 변경
      ref: "category",
    },
    owner: {
      required: true,
      type: String, //TODO: Schema.Types.ObjectId로 변경
      ref: "user",
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

const AssetModel = model("asset", AssetSchema);

export default AssetModel;
