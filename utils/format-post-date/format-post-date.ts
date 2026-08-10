import { format } from "date-fns";

export function formatPostDate(date: string) {
  const newDate = new Date(date);
  return format(newDate, "MMMM do, yyyy");
}
