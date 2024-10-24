import { PortableText } from "@portabletext/react";
import type { NextPage } from "next";
import Link from "next/link";

import { SideContents } from "@common/components/SideContents";
import ArticleSection, {
  ArticleSectionProvider,
} from "@common/components/post/ArticleSection";
import LinkHeading from "@common/components/post/LinkHeading";
import { Footnotes, Sources } from "@common/components/post/blocks";
import {
  type ArticleFrontmatter,
  type Heading,
  articleBySlug,
  articlesFrontmatters,
} from "@common/mdxLoader";
import type * as Schema from "@common/sanityTypes";
import { blockRenderingElements } from "@common/utils/blockRendering";
import {
  getFootnotes,
  getHeadings,
  getSeriesPart,
  postReadingTime,
} from "@common/utils/blogpost";
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

type ArticleProps = {
  post: Schema.PostWithSeries;
};

const Article = ({ post }: ArticleProps) => {
  const formattedDate = formatDate(new Date(post.releaseDate));
  const headings = getHeadings(post);
  const footnotes = getFootnotes(post);

  const defaultFlags = Array(headings.length).fill(false);
  if (headings.length > 0) {
    defaultFlags[0] = true; // First section is always active
  }

  const renderedArticle = PortableText({
    value: post.content,
    components: blockRenderingElements,
  });

  // comment

  // Group renderedArticle's children into sections
  let sections = [];
  let currentSection = [];
  for (let i = 0; i < renderedArticle.props.children.length; i++) {
    if (renderedArticle.props.children[i].type === LinkHeading) {
      if (currentSection.length > 0) {
        sections.push(currentSection);
      }
      currentSection = [renderedArticle.props.children[i]];
    } else {
      currentSection.push(renderedArticle.props.children[i]);
    }
  }
  // Add the last section
  sections.push(currentSection);

  // Render the sections
  sections = sections.map((section, index) => {
    return (
      <ArticleSection sectionIndex={index} key={index}>
        {section}
      </ArticleSection>
    );
  });

  return (
    <article className="article">
      <div className="flex divide-x mb-6">
        <span className="pr-2">{formattedDate}</span>
        <span className="px-2">{postReadingTime(post).text}</span>
      </div>
      {isInSeries && (
        <p>
          This article is part {getSeriesPart(post)} of a multipart series. Be
          sure to check out the other articles{" "}
          <Link href={"/series"} className="link">
            in the series
          </Link>
          .
        </p>
      )}
      <div className="my-8">{sections}</div>
      <div className="my-8">
        <Footnotes footnotes={footnotes} />
      </div>
      <Sources sources={post.sources} />
    </article>
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

  return (
    <ArticleSectionProvider>
      <div className="absolute hidden lg:block top-0 left-full ml-6 mt-16 w-64 inset-y-0">
        <div className="sticky top-0 pt-14">
          <h1 className="text-xl">Table of Contents</h1>
          <SideContents headings={article.headings} />
        </div>
      </div>
      <Link href={`/post/${article.slug}`}>
        <h1 className="heading-primary text-5xl mb-8">{article.title}</h1>
      </Link>
      <Contents headings={article.headings} />
      <Post />
    </ArticleSectionProvider>
  );
};

export default Page;
