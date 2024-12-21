import type { NextPage } from "next";

import { articlesFrontmatters } from "@common/mdxLoader";
import { ArticlePreviewCard } from "@components/ArticlePreviewCard";

export const metadata = {
  title: "Blog",
};

export const dynamic = "force-static";

const BlogListing: NextPage = async () => {
  const frontmatters = await articlesFrontmatters();
  const postsCards = frontmatters.map((post) => (
    <li key={post.slug}>
      <ArticlePreviewCard post={post} />
    </li>
  ));

  return (
    <>
      <h1 className="display-medium mb-8">The Blog</h1>
      <ul className="flex flex-col gap-6">{postsCards}</ul>
    </>
  );
};

export default BlogListing;
