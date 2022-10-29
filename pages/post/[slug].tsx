import { getClient } from '@sanity/sanity.server';
import { groq } from 'next-sanity';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote'
import readingTime from 'reading-time'
import CodeSample from '@components/CodeSample';
import LinkHeading, { makeSlug } from '@components/LinkHeading';

export default function Page({ title, content, reading_time, headings, ...rest }: any) {
  const created_date = new Date(rest._createdAt);

  const heading_items = headings.map(({ text, slug }: any) =>
    <li key={slug} className="hover:underline"><a href={"#" + slug}>{text}</a></li>
  );

  return (
    <div>
      <h1>{title}</h1>
      <div className='flex divide-x mb-6'>
        <span className='pr-2'>
          {created_date.toISOString().split('T')[0]}
        </span>
        <span className='px-2'>
          {reading_time.text}
        </span>
      </div>
      <div className='bg-gray-100 p-2 rounded'>
        <div className='text-xl font-bold pb-3'>Contents</div>
        <ul>
          {heading_items}
        </ul>
      </div>
      <MDXRemote {...content} components={{ code: CodeSample, h2: LinkHeading }} />
    </div>
  );
}

async function getH2Headings(source: string) {
  // Get each line individually, and filter out anything that
  // isn't a h2 heading.
  const headingLines = source.split("\n").filter((line) => {
    return line.match(/^##\s/);
  });
  return headingLines.map((raw) => {
    const text = raw.replace(/^##\s/, "");

    const slug = makeSlug(text);

    return { text, slug };
  });
}

export async function getStaticProps({ params }: any) {

  const post = await getClient().fetch(groq`*[_type == "post" && slug.current == $slug][0]`,
    {
      slug: params.slug,
    });

  const content = await serialize(post.content);
  const reading_time = readingTime(post.content); // markdown

  const headings = await getH2Headings(post.content);

  // Spread first, so edited fields are not covered
  return {
    props: {
      ...post,
      content,
      reading_time,
      headings
    }
  };
}

export async function getStaticPaths() {
  const slugs = await getClient().fetch(groq`*[_type == "post"].slug.current`);

  return {
    paths: slugs.map((slug: string) => ({ params: { slug } })),
    fallback: false,
  };
}