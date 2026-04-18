import aboutSource from "../content/about_me.mdx?raw";
import repositoriesRaw from "../content/reposit.json?raw";
import { compileMdx, type MdxComponent } from "./mdx";

export type Heading = {
  value: string;
  depth: number;
  slug: string;
};

export type Repo = {
  name: string;
  link: string;
  description: string;
  technologies: string[];
  img: string | null;
  githubData: {
    name: string;
    description: string | null;
    updated_at: string;
    language: string;
  };
};

export type ArticlePreview = {
  slug: string;
  title: string;
  published: boolean;
  releaseDate: string;
  summary?: string;
  titleImage?: string;
  readingTime: string;
  headings: Heading[];
};

export type Article = ArticlePreview & {
  body: string;
  source: string;
  Content: MdxComponent;
};

export type AboutContent = {
  source: string;
  Content: MdxComponent;
};

type ParsedFrontmatter = {
  title?: string;
  published?: boolean;
  releaseDate?: string;
  summary?: string;
  titleImage?: string;
};

const rawArticles = import.meta.glob("../content/articles/*.mdx", {
  eager: true,
  import: "default",
  query: "?raw",
}) as Record<string, string>;

const repositories = JSON.parse(repositoriesRaw) as Repo[];

const aboutContent = await createAboutContent();

const allArticles = (
  await Promise.all(
    Object.entries(rawArticles).map(([filePath, source]) =>
      createArticle(filePath, source),
    ),
  )
).sort(
  (left, right) =>
    new Date(right.releaseDate).getTime() -
    new Date(left.releaseDate).getTime(),
);

export function formatDate(date: string) {
  return date;
}

export function getRepositories() {
  return repositories;
}

export function getAboutContent() {
  return aboutContent;
}

export function getVisibleArticles() {
  return import.meta.env.PROD
    ? allArticles.filter((article) => article.published)
    : allArticles;
}

export function getLatestArticles(count: number) {
  return getVisibleArticles().slice(0, count).map(toPreview);
}

export function getArticlePreviews() {
  return getVisibleArticles().map(toPreview);
}

export function getArticleBySlug(slug: string) {
  return allArticles.find((article) => article.slug === slug);
}

async function createAboutContent(): Promise<AboutContent> {
  const source = aboutSource.trim();

  return {
    source,
    Content: await compileMdx(source),
  };
}

async function createArticle(
  filePath: string,
  source: string,
): Promise<Article> {
  const slug =
    filePath
      .split("/")
      .pop()
      ?.replace(/\.mdx$/, "") ?? "article";
  const { frontmatter, body } = splitFrontmatter(source);
  const normalizedBody = body.trim();
  const releaseDate = frontmatter.releaseDate ?? "1970-01-01";

  return {
    slug,
    title: frontmatter.title ?? slug,
    published: frontmatter.published ?? false,
    releaseDate,
    summary: frontmatter.summary ?? extractExcerpt(normalizedBody),
    titleImage: frontmatter.titleImage,
    readingTime: readingTime(normalizedBody),
    headings: extractHeadings(normalizedBody),
    body: normalizedBody,
    source: source.trim(),
    Content: await compileMdx(normalizedBody),
  };
}

function splitFrontmatter(source: string) {
  const normalized = source.replace(/\r\n/g, "\n");

  if (!normalized.startsWith("---\n")) {
    return {
      frontmatter: {} as ParsedFrontmatter,
      body: normalized,
    };
  }

  const endIndex = normalized.indexOf("\n---\n", 4);
  if (endIndex === -1) {
    return {
      frontmatter: {} as ParsedFrontmatter,
      body: normalized,
    };
  }

  const frontmatterBlock = normalized.slice(4, endIndex);
  const body = normalized.slice(endIndex + 5);

  return {
    frontmatter: parseFrontmatter(frontmatterBlock),
    body,
  };
}

function parseFrontmatter(frontmatterBlock: string): ParsedFrontmatter {
  const parsed: ParsedFrontmatter = {};

  for (const line of frontmatterBlock.split("\n")) {
    const separatorIndex = line.indexOf(":");

    if (separatorIndex === -1) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    const rawValue = line.slice(separatorIndex + 1).trim();
    const value = stripQuotes(rawValue);

    if (key === "published") {
      parsed.published = value === "true";
      continue;
    }

    if (key === "title") {
      parsed.title = value;
      continue;
    }

    if (key === "releaseDate") {
      parsed.releaseDate = value;
      continue;
    }

    if (key === "summary") {
      parsed.summary = value;
      continue;
    }

    if (key === "titleImage") {
      parsed.titleImage = value;
    }
  }

  return parsed;
}

function stripQuotes(value: string) {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }

  return value;
}

function readingTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

function extractHeadings(content: string): Heading[] {
  const headings: Heading[] = [];
  const headingPattern = /^(#{2,6})\s+(.+)$/gm;

  for (const match of content.matchAll(headingPattern)) {
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

function extractExcerpt(content: string) {
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

function cleanupInlineMarkdown(value: string) {
  return value.replace(/[`*_~]/g, "").trim();
}

function makeSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toPreview(article: Article): ArticlePreview {
  return {
    slug: article.slug,
    title: article.title,
    published: article.published,
    releaseDate: article.releaseDate,
    summary: article.summary,
    titleImage: article.titleImage,
    readingTime: article.readingTime,
    headings: article.headings,
  };
}
