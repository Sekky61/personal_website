import type { ArticlePreview } from "../../../lib/content";

export const defaultArticlePreview: ArticlePreview = {
  slug: "overview-of-intel-sgx",
  title: "Building a component playground inside the app",
  published: true,
  releaseDate: "2026-04-25",
  summary:
    "A small internal route for tuning copy, checking truncation, and testing layout against realistic content.",
  readingTime: "4 min read",
  tags: ["TanStack Start", "Design System", "DX"],
  headings: [
    { depth: 2, value: "Playground setup", slug: "playground-setup" },
    { depth: 2, value: "String controls", slug: "string-controls" },
    { depth: 2, value: "Component previews", slug: "component-previews" },
  ],
};
