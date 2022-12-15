import { getClient } from '@sanity/sanity.server';
import { groq } from 'next-sanity';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import readingTime from 'reading-time';
import CodeSample from '@components/CodeSample';
import LinkHeading from '@components/LinkHeading';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { getH2Headings } from '@common/utils/article';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';

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

const components = {
  code: CodeSample,
  h2: LinkHeading
};

export default function Page({ title, content, reading_time, headings, sources, slug, series, ...rest }: InferGetStaticPropsType<typeof getStaticProps>) {
  const created_date = new Date(rest._createdAt);
  const formatted_date = created_date.toISOString().split('T')[0];

  const is_in_series = series.length != 0;

  console.dir(series);

  let series_part_index = -1;
  if (is_in_series) {
    series_part_index = series[0].posts.findIndex((el: any) => {
      return el._ref == rest._id;
    });
    series_part_index += 1;
  }

  console.assert(!is_in_series || series_part_index != -1);

  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <Link href={`/post/${slug}`}>
        <h1>
          {title}
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
          Be sure to check out the other articles <Link href={`/series/${series[0].slug.current}`}>in the series</Link>.
        </p>
        : <></>
      }
      <Contents headings={headings}></Contents>
      <div className='my-8'>
        <MDXRemote {...content} components={components} />
      </div>
      <Sources sources={sources}></Sources>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context?.params?.slug;

  // Note: drafts are loaded as well (they differ in ID) if user is authenticated (dev acc.)
  const post = await getClient().fetch(groq`*[_type == "post" && slug.current == $slug][0]{
    ...,
    "series": *[_type == "series" && references(^._id)]
  }`, { slug });

  const content = await serialize(post.content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [],
      format: 'mdx'
    },
  });
  const reading_time = readingTime(post.content); // markdown

  const headings = getH2Headings(post.content);

  // Spread first, so edited fields are not covered
  return {
    props: {
      ...post,
      content,
      reading_time,
      headings,
      slug
    }
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await getClient().fetch(groq`*[_type == "post"].slug.current`);
  const paths = slugs.map((slug: string) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
}