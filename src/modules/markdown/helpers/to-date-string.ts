export function toDateString(value: string | Date) {
  if (typeof value === "string") {
    return value;
  }

  return value.toISOString().slice(0, 10);
}
