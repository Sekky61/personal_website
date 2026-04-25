import type { MarkdownFrontmatter } from "../types";
import { asBoolean } from "./as-boolean";
import { asDateString } from "./as-date-string";
import { asString } from "./as-string";

export function normalizeFrontmatter(
  data: Record<string, unknown>,
): MarkdownFrontmatter {
  return {
    title: asString(data.title),
    published: asBoolean(data.published),
    releaseDate: asDateString(data.releaseDate),
    summary: asString(data.summary),
    titleImage: asString(data.titleImage),
  };
}
