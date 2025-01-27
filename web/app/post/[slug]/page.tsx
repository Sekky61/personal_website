import type { NextPage } from "next";
import Link from "next/link";

import { mdxComponents } from "@common/blockRendering";
import { SideContents } from "@common/components/SideContents";
import { ArticleSectionProvider } from "@common/components/post/ArticleSection";
import { MetaBlock, MetaBlockHeading } from "@common/components/post/MetaBlock";
import {
  type ArticleMetadata,
  type Heading,
  articleBySlug,
  allPublishedArticles,
} from "@common/mdxLoader";
import { formatDate } from "@common/utils/misc";
import { notFound } from "next/navigation";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const slug = (await params).slug;
  const article = await articleBySlug(slug);
  return {
    title: article.title,
    description: article.summary ?? 'A blogpost by Majer',
    authors: [{name: 'Michal Majer'}],
    category: 'technology',
    // todo: date?
  };
}

export const generateStaticParams = async () => {
  const articles = await allPublishedArticles();
  console.info(
    "Generating articles:",
    ...articles.map((a) => a.slug),
  );
  return articles;
};

export const dynamic = "force-static";

// Renders the contents of a post
const Contents = ({ headings }: { headings: Heading[] }) => {
  // Do not render if there are no headings
  if (headings.length === 0) {
    return null;
  }

  const heading_items = headings.map(({ value, slug }: Heading) => (
    <li key={slug} className="ml-2">
      <a href={`#${slug}`} className="link">
        {value}
      </a>
    </li>
  ));

  return (
    <MetaBlock className="my-10">
      <MetaBlockHeading>Contents</MetaBlockHeading>
      <ul className="list-bullet">{heading_items}</ul>
    </MetaBlock>
  );
};

export default async function Page(props: {
  params: Promise<ArticleMetadata>;
}) {
  const params = await props.params;
  const article = await articleBySlug(params.slug);
  const Post = article.component;

  if (!Post) {
    notFound();
  }

  const formattedDate = formatDate(new Date(article?.releaseDate));

  return (
    <ArticleSectionProvider>
      <article className="article">
        <div className="absolute hidden lg:block top-0 left-full ml-6 mt-16 w-64 inset-y-0">
          <div className="sticky top-0 pt-14">
            <div className="title-large">Table of Contents</div>
            <SideContents headings={article.headings} />
          </div>
        </div>
        <Link href={`/post/${article.slug}`}>
          <h1 className="display-large">{article.title}</h1>
        </Link>
        <div className="flex divide-x mb-6 mt-4">
          <span className="pr-2">{formattedDate}</span>
          <span className="px-2">{article.readingTime}</span>
        </div>
        <Contents headings={article.headings} />
        <Post components={mdxComponents} />
      </article>
    </ArticleSectionProvider>
  );
}
