import { Schema, model } from "mongoose";
import { groupSchemaType } from "../type/schema";

const GroupSchema = new Schema<groupSchemaType>(
  {
    name: {
      required: true,
      type: String,
    },
    code: {
      required: true,
      type: String,
    },
    members: [
      {
        userId: {
          required: true,
          type: Schema.Types.ObjectId,
        },
        role: {
          required: true,
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

const GroupModel = model("group", GroupSchema);

export default GroupModel;
