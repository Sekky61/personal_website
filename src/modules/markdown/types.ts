export type Heading = {
  value: string;
  depth: number;
  slug: string;
};

export type MarkdownFrontmatter = {
  title?: string;
  published?: boolean;
  releaseDate?: string;
  summary?: string;
  titleImage?: string;
  tags?: string[];
};

export type MarkdownDocument = {
  source: string;
  body: string;
  frontmatter: MarkdownFrontmatter;
};
