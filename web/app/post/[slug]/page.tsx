import { PortableText } from "@portabletext/react";
import type { NextPage } from "next";
import Link from "next/link";

import ArticleSection, { ArticleSectionProvider } from "@common/components/post/ArticleSection";
import LinkHeading from "@common/components/post/LinkHeading";
import { Footnotes, Sources } from "@common/components/post/blocks";
import type * as Schema from "@common/sanityTypes";
import { blockRenderingElements } from "@common/utils/blockRendering";
import {
  type Heading,
  getFootnotes,
  getHeadings,
  getSerieSlug,
  getSeriesPart,
  isPartOfSeries,
  postReadingTime,
} from "@common/utils/blogpost";
import { formatDate } from "@common/utils/misc";
import { getAllSlugs, getPostBySlug } from "@common/utils/sanity/dataLoaders";
import { SideContents } from "@common/components/SideContents";

export async function generateMetadata({
  params,
}: { params: { slug: string } }) {
  return {
    title: "Majer - Post",
  };
}

export const generateStaticParams = async () => {
  const slugs = await getAllSlugs();
  const paths = slugs.map((slug: string) => ({ slug }));

  return paths;
};

export const dynamic = "force-static";

// Renders the contents of a post
const Contents = ({ headings }: { headings: Heading[] }) => {
  // Do not render if there is no content
  if (headings.length === 0) {
    return null;
  }

  const heading_items = headings.map(({ text, slug }: Heading) => (
    <li key={slug} className="hover:underline">
      <a href={`#${slug}`}>{text}</a>
    </li>
  ));

  return (
    <div className="metablock">
      <div className="metablock-heading">Contents</div>
      <ul>{heading_items}</ul>
    </div>
  );
};

type ArticleProps = {
  post: Schema.PostWithSeries;
};

const Article = ({ post }: ArticleProps) => {
  const formattedDate = formatDate(new Date(post.releaseDate));
  const isInSeries = isPartOfSeries(post);
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
    <div className="article">
      <Link href={`/post/${post.slug.current}`}>
        <h1 className="heading-primary text-5xl mb-8">{post.title}</h1>
      </Link>
      <div className="flex divide-x mb-6">
        <span className="pr-2">{formattedDate}</span>
        <span className="px-2">{postReadingTime(post).text}</span>
      </div>
      {isInSeries && (
        <p>
          This article is part {getSeriesPart(post)} of a multipart series. Be
          sure to check out the other articles{" "}
          <Link href={`/series/${getSerieSlug(post)}`} className="link">
            in the series
          </Link>
          .
        </p>
      )}
      <Contents headings={headings} />
      <div className="my-8">{sections}</div>
      <div className="my-8">
        <Footnotes footnotes={footnotes} />
      </div>
      <Sources sources={post.sources} />
    </div>
  );
};

type PageProps = {
  params: {
    slug: string;
  };
};

const Page: NextPage<PageProps> = async ({ params: { slug } }) => {
  // Note: drafts are loaded as well (they differ in ID) if user is authenticated (dev acc.)
  const post = await getPostBySlug(slug);
  const headings = getHeadings(post);

  return (
    <div className="small-container mt-10 px-4">
      <div className="relative">
        <ArticleSectionProvider>
          <main>
            <Article post={post} />
          </main>
          <div className="absolute top-0 left-full ml-6 mt-32 w-64 h-full">
            <div className="sticky top-0 pt-14">
              <SideContents headings={headings} />
            </div>
          </div>
        </ArticleSectionProvider>
      </div>
    </div>
  );
};

export default Page;
