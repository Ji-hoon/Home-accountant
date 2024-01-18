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
      type: String,
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
