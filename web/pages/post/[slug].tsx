import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import assert from 'assert';

import { PortableText } from '@portabletext/react'

import { Blogpost, BlogpostDataLoader } from '@common/utils/blogpost';
import { Contents, Footnotes, Sources } from '@common/components/post/blocks';
import { blockRenderingElements } from '@common/utils/blockRendering';

export default function Page({ postData }: any) {
  const post = new Blogpost(postData);
  const formattedDate = post.releaseDate.toISOString().split('T')[0];
  const isInSeries = post.isPartOfSeries();

  return (
    <div className='article'>
      <Head>
        <title>{post.data.title}</title>
      </Head>
      <Link href={`/post/${post.slug}`}>
        <h1>
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
