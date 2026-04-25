export function extractExcerpt(content: string) {
  const sanitized = content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/^#+\s+/gm, "")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[`*_~]/g, "");

  const paragraph = sanitized
    .split(/\n\s*\n/)
    .map((chunk) => chunk.trim())
    .find((chunk) => chunk.length > 0);

  if (!paragraph) {
    return undefined;
  }

  return paragraph.length > 180
    ? `${paragraph.slice(0, 177).trimEnd()}...`
    : paragraph;
}
