import { expenseSchemaType } from "../type/schema.js";

export function calculateTotalAmounts(expenses: Array<expenseSchemaType>) {
  const initialValue = 0;
  const totalAmounts = Array.from(expenses).reduce(
    (accumulator: number, currentExpense) => {
      return accumulator + currentExpense.amounts;
    },
    initialValue,
  );

  return totalAmounts;
}
