export function asBoolean(value: unknown) {
  return typeof value === "boolean" ? value : undefined;
}
