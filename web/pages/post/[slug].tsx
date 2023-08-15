import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { ReactElement, useEffect, useState } from 'react';
import assert from 'assert';
import { NextPageWithLayout } from 'pages/_app';
import { PortableText } from '@portabletext/react'

import { Heading, getFootnotes, getHeadings, getSerieSlug, getSeriesPart, isPartOfSeries, postReadingTime } from '@common/utils/blogpost';
import { Footnotes, Sources } from '@common/components/post/blocks';
import { blockRenderingElements } from '@common/utils/blockRendering';
import { BlogPostLayout } from '@common/components/layout/Layout';
import LinkHeading from '@common/components/post/LinkHeading';
import { formatDate } from '@common/utils/misc';
import type * as Schema from "@common/sanityTypes";
import { getAllSlugs, getPostBySlug } from '@common/utils/sanity/dataLoaders';
import ArticleSection from '@common/components/post/ArticleSection';

interface PageProps {
  post: Schema.PostWithSeries
}

// Renders the contents of a post
export const Contents = ({ headings }: { headings: Heading[] }) => {
  // Do not render if there is no content
  if (headings.length === 0) {
    return null;
  }

  const heading_items = headings.map(({ text, slug }: Heading) =>
    <li key={slug} className="hover:underline">
      <a href={"#" + slug}>{text}</a>
    </li>
  );

  return (
    <div className='metablock'>
      <div className='metablock-heading'>Contents</div>
      <ul>
        {heading_items}
      </ul>
    </div>
  );
}

type ArticleProps = {
  post: Schema.PostWithSeries,
  setActiveSectionIndex: (index: number) => void
}

const Article = ({ post, setActiveSectionIndex }: ArticleProps) => {


  const formattedDate = formatDate(new Date(post.releaseDate));
  const isInSeries = isPartOfSeries(post);
  const headings = getHeadings(post);
  const footnotes = getFootnotes(post);

  const defaultFlags = Array(headings.length).fill(false);
  if (headings.length > 0) {
    defaultFlags[0] = true; // First section is always active
  }
  const [activeFlags, setActiveFlags] = useState<boolean[]>(defaultFlags);

  function setFlag(index: number, value: boolean) {
    let newFlags = [...activeFlags];
    newFlags[index] = value;
    setActiveFlags(newFlags);
  }

  let renderedArticle = PortableText({
    value: post.content,
    components: blockRenderingElements
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

  function sectionBecameActive(active: boolean, index: number) {
    setFlag(index, active);
  }

  useEffect(() => {
    // TODO Sometimes the event does not fire and there is a hole in the array

    // choose the first active section
    const activeIndex = activeFlags.indexOf(true);
    setActiveSectionIndex(activeIndex);
  }, [activeFlags, setActiveSectionIndex]);

  // Render the sections
  sections = sections.map((section, index) => {
    return (
      <ArticleSection sectionIndex={index} key={index} active={(active) => sectionBecameActive(active, index)}>
        {section}
      </ArticleSection>
    );
  });

  return (
    <div className='article'>
      <Head>
        <title>{post.title}</title>
      </Head>
      <Link href={`/post/${post.slug}`}>
        <h1 className='heading-primary text-5xl mb-8'>
          {post.title}
        </h1>
      </Link>
      <div className='flex divide-x mb-6'>
        <span className='pr-2'>
          {formattedDate}
        </span>
        <span className='px-2'>
          {postReadingTime(post).text}
        </span>
      </div>
      {isInSeries &&
        <p>
          This article is part {getSeriesPart(post)} of a multipart series.
          Be sure to check out the other articles <Link href={`/series/${getSerieSlug(post)}`} className='link'>in the series</Link>.
        </p>
      }
      <Contents headings={headings}></Contents>
      <div className='my-8'>
        {sections}
      </div>
      <div className='my-8'>
        <Footnotes footnotes={footnotes}></Footnotes>
      </div>
      <Sources sources={post.sources}></Sources>
    </div>
  );
}

type SideContentsProps = {
  headings: Heading[],
  activeSectionIndex: number
}

const SideContents = ({ headings, activeSectionIndex }: SideContentsProps) => {
  const heading_items = headings.map(({ text, slug }: Heading, index) =>
    <li key={slug} className={"hover:underline my-1.5 pl-3 transition-all duration-250 border-l-2 "
      + (index == activeSectionIndex ? "border-white" : "border-transparent")}>
      <a href={"#" + slug}>{text}</a>
    </li>
  );

  return (
    <div className="pt-4">
      <h1 className="text-xl">Table of Contents</h1>
      <ul className="ml-4 border-l">
        {heading_items}
      </ul>
    </div>
  );

}

const Page: NextPageWithLayout<PageProps> = ({ post }) => {
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);

  const headings = getHeadings(post);
  return (
    <div className="small-container mt-10 px-4">
      <div className="relative">
        <main>
          <Article post={post} setActiveSectionIndex={setActiveSectionIndex}></Article>
        </main>
        <div className="absolute top-0 left-full ml-6 mt-32 w-48 h-full">
          <div className="sticky top-0 pt-14">
            <SideContents headings={headings} activeSectionIndex={activeSectionIndex}></SideContents>
          </div>
        </div>
      </div>
    </div>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <BlogPostLayout>
      {page}
    </BlogPostLayout>
  )
}

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
  const slug = context?.params?.slug;
  assert(typeof (slug) == "string");

  // Note: drafts are loaded as well (they differ in ID) if user is authenticated (dev acc.)
  const post = await getPostBySlug(slug);

  return {
    props: {
      post,
    }
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await getAllSlugs();
  const paths = slugs.map((slug: string) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
}

export default Page;
