import type { Root, Yaml } from "mdast";
import remarkFrontmatter from "remark-frontmatter";
import remarkParse from "remark-parse";
import { unified } from "unified";
import { parse } from "yaml";
import type { MarkdownDocument } from "../types";
import { normalizeFrontmatter } from "./normalize-frontmatter";

const markdownParser = unified().use(remarkParse).use(remarkFrontmatter);

export function parseMarkdownDocument(source: string): MarkdownDocument {
  const normalizedSource = source.replace(/\r\n/g, "\n").trim();
  const tree = markdownParser.parse(normalizedSource);
  const frontmatter = getFrontmatterNode(tree);
  const body = getMarkdownBody(normalizedSource, frontmatter);
  const data = parseFrontmatter(frontmatter);

  return {
    source: normalizedSource,
    body: body.trim(),
    frontmatter: normalizeFrontmatter(data),
  };
}

function getFrontmatterNode(tree: Root): Yaml | undefined {
  const [firstChild] = tree.children;

  return firstChild?.type === "yaml" ? firstChild : undefined;
}

function getMarkdownBody(source: string, frontmatter?: Yaml): string {
  const frontmatterEndOffset = frontmatter?.position?.end?.offset;

  return frontmatterEndOffset === undefined
    ? source
    : source.slice(frontmatterEndOffset);
}

function parseFrontmatter(frontmatter?: Yaml): unknown {
  if (frontmatter === undefined) {
    return {};
  }

  return parse(frontmatter.value) ?? {};
}
