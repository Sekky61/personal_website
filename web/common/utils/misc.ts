// Nowhere-belonging utility functions

import { promises as fs } from "fs";
import type { ParsedPath } from "path";
import type { ArticleMetadata } from "@common/mdxLoader";
import readingTime from "reading-time";

export function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

export async function fileReadingTime(filePath: ParsedPath): Promise<string> {
  const p = `${filePath.dir}/${filePath.base}`;
  const content = await fs.readFile(p, "utf-8");
  return readingTimeFormatted(content);
}

export function readingTimeFormatted(content: string): string {
  const stats = readingTime(content);
  return stats.text;
}

export function postUrl(article: ArticleMetadata) {
  return `/post/${article.slug}`;
}

export { makeSlug } from "./makeSlug.mjs";
