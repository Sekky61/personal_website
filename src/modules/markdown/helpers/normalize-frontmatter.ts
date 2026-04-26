import { type } from "arktype";
import type { MarkdownFrontmatter } from "../types";
import { frontmatterType } from "./frontmatter-type";

export function normalizeFrontmatter(data: unknown): MarkdownFrontmatter {
  if (Array.isArray(data)) {
    throw new TypeError("Invalid frontmatter:\nExpected a YAML object.");
  }

  const parsedFrontmatter = frontmatterType(data);

  if (parsedFrontmatter instanceof type.errors) {
    throw new TypeError(`Invalid frontmatter:\n${parsedFrontmatter.summary}`);
  }

  return parsedFrontmatter;
}
