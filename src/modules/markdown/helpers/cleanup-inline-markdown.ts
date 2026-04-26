export function cleanupInlineMarkdown(value: string) {
  return value.replace(/[`*_~]/g, "").trim();
}
