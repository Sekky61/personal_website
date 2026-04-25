import { HEADING_PATTERN } from "../constants/heading-pattern";
import type { Heading } from "../types";
import { cleanupInlineMarkdown } from "./cleanup-inline-markdown";
import { makeSlug } from "./make-slug";

export function extractHeadings(content: string): Heading[] {
  const headings: Heading[] = [];

  for (const match of content.matchAll(HEADING_PATTERN)) {
    const marks = match[1];
    const value = cleanupInlineMarkdown(match[2]);

    headings.push({
      value,
      depth: marks.length,
      slug: makeSlug(value),
    });
  }

  return headings;
}
