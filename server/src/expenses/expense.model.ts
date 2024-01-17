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
      ref: "category",
    },
    owner: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    isRecurring: {
      required: true,
      type: Boolean,
    },
  },
  {
    timestamps: true,
  },
);

const ExpenseModel = model("expense", ExpenseSchema);

export default ExpenseModel;
