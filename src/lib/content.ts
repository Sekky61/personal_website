import aboutSource from "../content/about_me.mdx?raw";
import repositoriesRaw from "../content/reposit.json?raw";
import { extractExcerpt } from "../modules/markdown/helpers/extract-excerpt";
import { extractHeadings } from "../modules/markdown/helpers/extract-headings";
import { parseMarkdownDocument } from "../modules/markdown/helpers/parse-markdown-document";
import { readingTime } from "../modules/markdown/helpers/reading-time";
import type { Heading } from "../modules/markdown/types";
import { compileMdx, type MdxComponent } from "./mdx";

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
  tags?: string[];
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
  const { source } = parseMarkdownDocument(aboutSource);

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
  const document = parseMarkdownDocument(source);
  const normalizedBody = document.body;
  const { frontmatter } = document;
  const releaseDate = frontmatter.releaseDate ?? "1970-01-01";
  const summary = frontmatter.summary ?? extractExcerpt(normalizedBody);

  return {
    slug,
    title: frontmatter.title ?? slug,
    published: frontmatter.published ?? false,
    releaseDate,
    readingTime: readingTime(normalizedBody),
    headings: extractHeadings(normalizedBody),
    body: normalizedBody,
    source: document.source,
    Content: await compileMdx(normalizedBody),
    ...(summary === undefined ? {} : { summary }),
    ...(frontmatter.titleImage === undefined
      ? {}
      : { titleImage: frontmatter.titleImage }),
    ...(frontmatter.tags === undefined ? {} : { tags: frontmatter.tags }),
  };
}

function toPreview(article: Article): ArticlePreview {
  return {
    slug: article.slug,
    title: article.title,
    published: article.published,
    releaseDate: article.releaseDate,
    readingTime: article.readingTime,
    headings: article.headings,
    ...(article.summary === undefined ? {} : { summary: article.summary }),
    ...(article.titleImage === undefined
      ? {}
      : { titleImage: article.titleImage }),
    ...(article.tags === undefined ? {} : { tags: article.tags }),
  };
}
