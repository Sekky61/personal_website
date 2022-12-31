import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import readingTime, { ReadTimeResults } from 'reading-time';
import assert from 'assert';

import { PortableText } from '@portabletext/react'
import { PortableTextComponents } from '@portabletext/react'

import CodeSample from '@components/CodeSample';
import LinkHeading from '@components/LinkHeading';
import { Blogpost, BlogpostLoader } from '@common/utils/blogpost';

const Contents = ({ headings }: any) => {
  const heading_items = headings.map(({ text, slug }: any) =>
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

const Footnotes = ({ footnotes }: any) => {
  const footnote_items = footnotes.map(({ text, number }: any) =>
    <li key={number} id={`#footnote-${number}`}>
      {text}
    </li>
  );

  return (
    <div className='metablock'>
      <div className='metablock-heading'>Footnotes</div>
      <ol className='list-inside list-decimal'>
        {footnote_items}
      </ol>
    </div>
  );
}

const Sources = ({ sources }: any) => {
  // todo workaround for articles without sources
  sources ??= [];

  const source_items = sources.map(({ link, name }: any) =>
    <li key={name}>
      <span className='mr-4'>{name}</span>
      <a target="_blank" rel="noopener noreferrer" href={link} className="hover:underline">{link}</a>
    </li>
  );

  return (
    <div className='metablock'>
      <div className='metablock-heading'>Sources</div>
      <ol className='list-decimal ml-8'>
        {source_items}
      </ol>
    </div>
  );
}

const CustomImage = (p: any) => {
  return (
    <div className='flex justify-center'>
      <div className='rounded-md overflow-hidden'>
        <Image src={p.value.url} alt={p.alt} width={450} height={450} />
      </div>
    </div>
  );
}

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
    h2: LinkHeading,
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

type PageProps = {
  post: Blogpost;
  reading_time: ReadTimeResults;
  slug: string;
}

export default function Page({ post, reading_time, slug }: PageProps) {
  const created_date = new Date(post.data._createdAt);
  const formatted_date = created_date.toISOString().split('T')[0];

  const is_in_series = post.data.series.length != 0;

  let series_part_index = -1;
  if (is_in_series) {
    series_part_index = post.data.series[0].posts.findIndex((el: any) => {
      return el._ref == post.data._id;
    });
    series_part_index += 1;
  }

  assert(!is_in_series || series_part_index != -1);

  return (
    <div>
      <Head>
        <title>{post.data.title}</title>
      </Head>
      <Link href={`/post/${slug}`}>
        <h1>
          {post.data.title}
        </h1>
      </Link>
      <div className='flex divide-x mb-6'>
        <span className='pr-2'>
          {formatted_date}
        </span>
        <span className='px-2'>
          {reading_time.text}
        </span>
      </div>
      {is_in_series ?
        <p>
          This article is part {series_part_index} of a multipart series.
          Be sure to check out the other articles <Link href={`/series/${post.data.series[0].slug.current}`}>in the series</Link>.
        </p>
        : <></>
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
      <Sources sources={post.data.sources}></Sources>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context?.params?.slug;
  assert(typeof (slug) == "string");

  // Note: drafts are loaded as well (they differ in ID) if user is authenticated (dev acc.)
  const post = await BlogpostLoader.getPostBySlug(slug);

  const reading_time = readingTime(post.plainText);

  // Spread first, so edited fields are not covered
  return {
    props: {
      post: JSON.parse(JSON.stringify(post)),
      reading_time,
      slug,
    }
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await BlogpostLoader.getAllSlugs();
  const paths = slugs.map((slug: string) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
}
