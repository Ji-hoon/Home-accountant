import { parse } from "date-fns";

export function parseStringyyyyMMddToDate(date: string) {
  return parse(date, "yyyy-MM-dd", new Date());
}
