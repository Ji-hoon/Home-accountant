import { Schema, model } from "mongoose";
import { expenseSchemaType } from "../type/schema";

const ExpenseSchema = new Schema<expenseSchemaType>(
  {
    amounts: {
      required: true,
      type: Number,
    },
    businessName: {
      required: true,
      type: String,
    },
    date: {
      required: true,
      type: Date,
    },
    category: {
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
    isRecurring: {
      required: true,
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const ExpenseModel = model("expense", ExpenseSchema);

export default ExpenseModel;
