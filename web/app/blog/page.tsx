import type { NextPage } from "next";
import Link from "next/link";

import { articlesFrontmatters } from "@common/mdxLoader";
import BlogPostCard from "@components/BlogPostCard";

export const metadata = {
  title: "Blog",
};

export const dynamic = "force-static";

const BlogListing: NextPage = async () => {
  const all = await articlesFrontmatters();
  const frontmatters = all.filter((post) => post.published);

  const postsCards = frontmatters.map((post) => (
    <li key={post.slug}>
      <BlogPostCard post={post} />
    </li>
  ));

  return (
    <>
      <h1 className="heading-primary mb-8">The Blog</h1>
      <ul className="flex flex-col divide-y">{postsCards}</ul>
    </>
  );
};

export default BlogListing;
