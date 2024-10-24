import type { NextPage } from "next";
import Link from "next/link";

import { articleFrontmatters, articleSlugs, articlesFrontmatters } from "@common/mdxLoader";
import {
  getPaginatedPosts,
  getPostsCount,
} from "@common/utils/sanity/dataLoaders";
import BlogPostCard from "@components/BlogPostCard";
import Pagination from "@components/Pagination";

export const metadata = {
  title: "Blog",
};

// This function returns a list of page paths so that the pages can be pre-rendered.
// eg. /blog/1 -> {params: {page: ['blog', '1']}}
export const generateStaticParams = async () => {
  const postsCount = await getPostsCount();
  const pagesCount = Math.max(Math.ceil(postsCount / resultsPerPage), 1); // At least one
  const pageNumbers = Array.from({ length: pagesCount }, (_, i) => i + 1); // Numbers 1..=pagesCount

  // Create an array of page paths, each containing a page number
  const pagePaths: { page: string[] }[] = pageNumbers.map(
    (pageNumber: number) => ({ page: [pageNumber.toString()] }),
  );
  // add the /blog path
  pagePaths.push({ page: [] });

  return pagePaths;
};

export const dynamic = "force-static";

const resultsPerPage = 10;

type BlogListingProps = {
  // Optional path like /blog/1, /blog/2, but also /blog
  // If more than one is submitted, throw an error
  params: { page?: string[] };
};

const BlogListing: NextPage<BlogListingProps> = async ({ params }) => {
  const page = params.page ?? ["1"];
  if (page.length > 1) {
    throw new Error("Only one page number is allowed");
  }
  const pageNum = Number.parseInt(page[0]);

  const from = (pageNum - 1) * resultsPerPage;
  const to = from + resultsPerPage;

  const allArticles = await articlesFrontmatters();
  console.log(allArticles);

  const postsData = await getPaginatedPosts(from, to);
  const postsCount = await getPostsCount();
  const postsCards = allArticles.map((post) => (
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
      <div className="pt-4">
        <Pagination
          currentPage={pageNum}
          perPage={resultsPerPage}
          total={postsCount}
          pathPrefix="/blog"
        />
      </div>
    </>
  );
};

export default BlogListing;
