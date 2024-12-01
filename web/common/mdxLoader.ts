"use server";

import { promises as fs } from "node:fs";
import path from "path";
import { fileReadingTime, makeSlug } from "./utils/misc";

export interface ArticleFrontmatter {
  /**
   * The component that will be rendered
   */
  component: any;

  /**
   * Page Title — `string`
   */
  title: string;

  /**
   * Custom URL for the blogpost
   */
  slug: string;

  /**
   * Appears in the blogpost list iff true.
   * Still rendered and /post path exists if false.
   */
  published: boolean;

  /**
   * Release Date — `datetime`
   */
  releaseDate: Date;

  /**
   * fs path
   */
  filepath: string;

  /**
   * Reading time, formatted sentence
   */
  readingTime: string;

  /**
   * Tags — `tags`
   */
  tags: Tag[];

  /**
   * Sources — `array`
   *
   * Name and link to the source. Ordered. Link not required.
   */
  sources: Source[];

  /**
   * Headings
   */
  headings: Heading[];

  /**
   * Summary. A teaser for the article.
   */
  summary?: string;
}

// from stefanprobst/rehype-extract-toc plugin
export type Heading = {
  value: string;
  depth: number;
  slug: string;
  children: any;
};

export type Tag = {
  label: string;
  value: string;
};

export type Source = {
  /**
   * A sort of heading/name for a source
   */
  name: string;

  /**
   * URL for the source
   */
  link: string;

  /**
   * Longer reference/bibliography
   */
  ref: string;
};

const defaultFrontmatter: ArticleFrontmatter = {
  title: "",
  slug: "",
  published: false,
  releaseDate: new Date(),
  tags: [],
  sources: [],
  headings: [],
  component: null,
  filepath: "",
  readingTime: "Who knows?",
};

export async function articleBySlug(
  slug: string,
): Promise<ArticleFrontmatter | null> {
  // The article will be at `content/${slug}.mdx`
  try {
    const article = await import(`../content/articles/${slug}.mdx`);
    return importToArticle(article);
  } catch (e) {
    console.error(`Failed to load article ${slug}.mdx`, e);
    return null;
  }
}

/**
 * Optional file content to aproximate reading time
 */
async function importToArticle(article: any): Promise<ArticleFrontmatter> {
  const filepath = path.parse(article.filepath); // extract slug from file name
  const headings = article.tableOfContents
    .map((heading: Heading) => {
      return {
        value: heading.value,
        depth: heading.depth,
        slug: makeSlug(heading.value),
        children: heading.children,
      };
    })
    .filter((heading: any) => heading.value !== "Footnotes");
  const releaseDate = new Date(article.frontmatter.releaseDate);
  const readingTime = await fileReadingTime(filepath);
  return {
    ...defaultFrontmatter,
    slug: filepath.name,
    headings,
    ...article.frontmatter,
    releaseDate,
    component: article.default,
    filepath: article.filepath,
    readingTime,
  };
}

export async function articleSlugs(): Promise<string[]> {
  const files = await fs.readdir("./content/articles");
  return files.map((file) => file.replace(/\.mdx$/, ""));
}

export async function articlesFrontmatters(): Promise<ArticleFrontmatter[]> {
  const slugs = await articleSlugs();
  const articles = await Promise.all(
    slugs.map(async (slug) => {
      const all = await import(`../content/articles/${slug}.mdx`);
      return importToArticle(all);
    }),
  );

  // only show published articles in production
  const published =
    process.env.NODE_ENV === "production"
      ? articles.filter((post) => post.published)
      : articles;

  // sort by publication date
  return published.sort(
    (a, b) => b.releaseDate.getTime() - a.releaseDate.getTime(),
  );
}

/**
 * Load content from the content directory
 * @param relativePath - the path to the content file, relative to the content directory
 */
export async function loadContent(relativePath: string) {
  const content = await import(`../content/${relativePath}`);
  return content.default;
}
