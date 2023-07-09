import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import assert from 'assert';

import { PortableText } from '@portabletext/react'

import { Blogpost, BlogpostDataLoader, Heading } from '@common/utils/blogpost';
import { Footnotes, Sources } from '@common/components/post/blocks';
import { blockRenderingElements } from '@common/utils/blockRendering';
import { ReactElement } from 'react';
import { NextPageWithLayout } from 'pages/_app';
import { BlogPostLayout } from '@common/components/layout/Layout';

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

const Article = ({ post }: { post: Blogpost }) => {
  const formattedDate = post.releaseDate.toISOString().split('T')[0];
  const isInSeries = post.isPartOfSeries();

  return (
    <div className='article'>
      <Head>
        <title>{post.data.title}</title>
      </Head>
      <Link href={`/post/${post.slug}`}>
        <h1 className='heading-primary text-5xl mb-8'>
          {post.data.title}
        </h1>
      </Link>
      <div className='flex divide-x mb-6'>
        <span className='pr-2'>
          {formattedDate}
        </span>
        <span className='px-2'>
          {post.readingTime().text}
        </span>
      </div>
      {isInSeries &&
        <p>
          This article is part {post.getSeriesPart()} of a multipart series.
          Be sure to check out the other articles <Link href={`/series/${post.getSerieSlug()}`} className='link'>in the series</Link>.
        </p>
      }
      <Contents headings={post.headings}></Contents>
      <div className='my-8'>
        <PortableText
          value={post.data.content}
          components={blockRenderingElements}
        />
      </div>
      <div className='my-8'>
        <Footnotes footnotes={post.footnotes}></Footnotes>
      </div>
      <Sources sources={post.sources}></Sources>
    </div>
  );
}

const SideContents = ({ headings }: { headings: Heading[] }) => {
  const heading_items = headings.map(({ text, slug }: Heading) =>
    <li key={slug} className="hover:underline my-1.5">
      <a href={"#" + slug}>{text}</a>
    </li>
  );

  return (
    <div className="pt-4">
      <h1 className="text-xl">Table of Contents</h1>
      <ul className="pl-3 ml-4 border-l">
        {heading_items}
      </ul>
    </div>
  );

}

const Page: NextPageWithLayout = ({ postData }: any) => {
  const post = new Blogpost(postData);

  return (
    <div className="small-container mt-10 px-4">
      <div className="relative">
        <main>
          <Article post={post}></Article>
        </main>
        <div className="absolute top-0 left-full ml-6 mt-32 w-48 h-full">
          <div className="sticky top-0 pt-14">
            <SideContents headings={post.headings}></SideContents>
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

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context?.params?.slug;
  assert(typeof (slug) == "string");

  // Note: drafts are loaded as well (they differ in ID) if user is authenticated (dev acc.)
  const postData = await BlogpostDataLoader.getPostBySlug(slug);

  return {
    props: {
      postData,
    }
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await BlogpostDataLoader.getAllSlugs();
  const paths = slugs.map((slug: string) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
}

export default Page;
