import type { NextPage } from "next";
import Link from "next/link";

import { articlesFrontmatters } from "@common/mdxLoader";
import BlogPostCard from "@components/BlogPostCard";

export const metadata = {
  title: "Blog",
};

export const dynamic = "force-static";

const BlogListing: NextPage = async () => {
  const frontmatters = await articlesFrontmatters();
  console.dir(frontmatters);
  console.log(frontmatters[0].headings);

  const postsCards = frontmatters.map((post) => (
    <li key={post.slug}>
      <BlogPostCard post={post} />
    </li>
  ));

  return (
    <>
      <h1 className="heading-primary">The Blog</h1>
      <p className="mb-6">
        Or check out blogposts sorted by{" "}
        <Link href={"/series"} className="link">
          series
        </Link>
      </p>
      <ul className="flex flex-col divide-y">{postsCards}</ul>
    </>
  );
};

export default BlogListing;
