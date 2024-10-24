import { promises as fs } from "fs";

export interface ArticleFrontmatter {
  /**
   * Page Title — `string`
   */
  title: string;

  /**
   * Slug — `slug`
   *
   * Custom URL for the blogpost
   */
  slug: string;

  /**
   * Published — `boolean`
   * Appears in the blogpost list iff true
   */
  published: boolean;

  /**
   * Release Date — `datetime`
   */
  releaseDate: Date;

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
}

type Tag = {
  label: string;
  value: string;
};

type Source = {
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
};

export async function articleBySlug(
  slug: string,
): Promise<React.ComponentType | null> {
  // The article will be at `content/${slug}.mdx`
  try {
    const { default: Md } = await import(`../content/articles/${slug}.mdx`);
    return Md;
  } catch (e) {
    console.error(`Failed to load article ${slug}.mdx`, e);
    return null;
  }
}

export async function articleSlugs(): Promise<string[]> {
  const files = await fs.readdir("./content/articles");
  return files.map((file) => file.replace(/\.mdx$/, ""));
}

export async function articles(): Promise<ArticleFrontmatter[]> {
  const slugs = await articleSlugs();
  return Promise.all(
    slugs.map(async (slug) => {
      const all = await import(`../content/articles/${slug}.mdx`);
      return {
        ...defaultFrontmatter,
        ...all,
      };
    }),
  );
}
