import matter from "gray-matter";
import type { MarkdownDocument } from "../types";
import { normalizeFrontmatter } from "./normalize-frontmatter";

export function parseMarkdownDocument(source: string): MarkdownDocument {
  const normalizedSource = source.replace(/\r\n/g, "\n").trim();
  const { content, data } = matter(normalizedSource);

  return {
    source: normalizedSource,
    body: content.trim(),
    frontmatter: normalizeFrontmatter(data),
  };
}
