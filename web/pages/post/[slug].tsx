import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import assert from 'assert';

import { PortableText } from '@portabletext/react'
import { PortableTextComponents } from '@portabletext/react'

import CodeSample from '@components/post/CodeSample';
import LinkHeading from '@components/post/LinkHeading';
import { Blogpost, BlogpostDataLoader } from '@common/utils/blogpost';
import { Contents, Footnotes, Sources } from '@common/components/post/blocks';

const CustomImage = (p: any) => {
  return (
    <div className='flex justify-center'>
      <div className='rounded-md overflow-hidden'>
        <Image src={p.value.url} alt={p.alt} width={450} height={450} />
      </div>
    </div>
  );
}

// Configuration for PortableText rendering
// Docs: https://github.com/portabletext/react-portabletext
const components: PortableTextComponents = {
  types: {
    image: CustomImage,
    codeFile: CodeSample,
    footnote: ({ value, index }) => {
      return (
        <a href={`#footnote-${index}`}>
          <sup>{index}</sup>
        </a>
      )
    },
  },
  block: {
    heading: LinkHeading,
  },
  marks: {
    internalLink: ({ value, children }) => {
      return <Link href={`/post/${value.slug.current}`} className='link'>{children}</Link>;
    },
    externalLink: ({ value, children }) => {
      return <a href={value.href} target={value.blank ? "_blank" : undefined} rel="noreferrer" className='link'>{children}</a>;
    },
  }
};

export default function Page({ postData }: any) {
  const post = new Blogpost(postData);
  const formattedDate = post.releaseDate.toISOString().split('T')[0];
  const isInSeries = post.isPartOfSeries();

  return (
    <div>
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
          components={components}
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
