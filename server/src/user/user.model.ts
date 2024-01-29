import { Schema, model } from "mongoose";
import { UserSchemaType } from "../type/schema";

const UserSchema = new Schema<UserSchemaType>(
  {
    nickname: {
      required: true,
      type: String,
    },
    snsId: {
      required: true,
      type: String,
    },
    profileImgUrl: {
      required: true,
      type: String,
    },
    group: {
      type: [Schema.Types.ObjectId],
      ref: "group",
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

const UserModel = model("user", UserSchema);

export default UserModel;
