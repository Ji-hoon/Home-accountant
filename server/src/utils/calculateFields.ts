import { expenseSchemaType } from "../type/schema.js";

//TODO: 추후 삭제 하기 (reduce가 아닌 db aggregate 로 구현함)
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
