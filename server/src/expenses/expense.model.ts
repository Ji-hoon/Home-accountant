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
    isRecurring: {
      required: true,
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const ExpenseModel = model("expenses", ExpenseSchema);

export default ExpenseModel;
