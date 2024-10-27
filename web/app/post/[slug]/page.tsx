import type { NextPage } from "next";
import Link from "next/link";

import { mdxComponents } from "@common/blockRendering";
import { SideContents } from "@common/components/SideContents";
import { ArticleSectionProvider } from "@common/components/post/ArticleSection";
import {
  type ArticleFrontmatter,
  type Heading,
  articleBySlug,
  articlesFrontmatters,
} from "@common/mdxLoader";
import { formatDate } from "@common/utils/misc";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: { params: { slug: string } }) {
  const article = await articleBySlug(params.slug);
  return {
    title: article?.title,
  };
}

export const generateStaticParams = async () => {
  const frontmatters = await articlesFrontmatters();
  console.info(
    "Generating articles:",
    frontmatters.map((a) => a.slug),
  );
  return frontmatters;
};

export const dynamic = "force-static";

// Renders the contents of a post
const Contents = ({ headings }: { headings: Heading[] }) => {
  // Do not render if there are no headings
  if (headings.length === 0) {
    return null;
  }

  const heading_items = headings.map(({ value, slug }: Heading) => (
    <li key={slug} className="pb-1">
      <a href={`#${slug}`} className="hover:underline">
        {value}
      </a>
    </li>
  ));

  return (
    <div className="metablock">
      <div className="metablock-heading">Contents</div>
      <ul className="list-none">{heading_items}</ul>
    </div>
  );
};

type PageProps = {
  params: ArticleFrontmatter;
};

const Page: NextPage<PageProps> = async ({ params }) => {
  const article = await articleBySlug(params.slug);
  const Post = article?.component;

  if (!Post) {
    notFound();
  }

  const formattedDate = formatDate(new Date(article?.releaseDate));

  return (
    <ArticleSectionProvider>
      <article className="article">
        <div className="absolute hidden lg:block top-0 left-full ml-6 mt-16 w-64 inset-y-0">
          <div className="sticky top-0 pt-14">
            <h1 className="text-xl">Table of Contents</h1>
            <SideContents headings={article.headings} />
          </div>
        </div>
        <Link href={`/post/${article.slug}`}>
          <h1 className="heading-primary text-5xl mb-8">{article.title}</h1>
        </Link>
        <div className="flex divide-x mb-6">
          <span className="pr-2">{formattedDate}</span>
          <span className="px-2">{article.readingTime}</span>
        </div>
        <Contents headings={article.headings} />
        <Post components={mdxComponents} />
        <div className="my-8"></div>
      </article>
    </ArticleSectionProvider>
  );
};

export default Page;
