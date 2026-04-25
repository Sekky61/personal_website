import { type } from "arktype";
import type { MarkdownFrontmatter } from "../types";
import { frontmatterType } from "./frontmatter-type";

export function normalizeFrontmatter(
  data: unknown,
): MarkdownFrontmatter {
  const parsedFrontmatter = frontmatterType(data);

  if (parsedFrontmatter instanceof type.errors) {
    throw new TypeError(`Invalid frontmatter:\n${parsedFrontmatter.summary}`);
  }

  return parsedFrontmatter;
}
