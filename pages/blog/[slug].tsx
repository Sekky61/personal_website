import { getClient } from '@sanity/sanity.server';
import { groq } from 'next-sanity';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote'
import CodeSample from '@components/CodeSample';

export default function Page({ title, content }: any) {
  return (
    <div>
      <h1>{title}</h1>
      <MDXRemote {...content} components={{ code: CodeSample }} />
    </div>
  );
}

export async function getStaticProps({ params }: any) {

  const post = await getClient().fetch(groq`*[_type == "post" && slug.current == $slug][0]`,
    {
      slug: params.slug,
    });

  const content = await serialize(post.content);

  // Spread first, so edited fields are not covered
  return {
    props: {
      ...post,
      content,
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