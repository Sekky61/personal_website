import { getClient } from '@sanity/sanity.server';
import { groq } from 'next-sanity';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote'
import Callout from '@components/Callout';
import CodeSample from '@components/CodeSample';

export default function Page({ title, content }: any) {
  return (
    <div>
      <h1>{title}</h1>
      <MDXRemote {...content} components={{ Callout, code: CodeSample }} />
    </div>
  );
}

export async function getStaticProps({ params }: any) {

  const post = await getClient(false).fetch(groq`*[_type == "post" && slug.current == $slug][0]`,
    {
      slug: params.slug,
    });

  console.log(post);

  const content = await serialize(post.content);

  return {
    props: {
      title: post.title,
      content,
    },
  };
}

export async function getStaticPaths() {
  const posts = await getClient(false).fetch(groq`*[_type == "post"]`);

  return {
    paths: posts.map((p: any) => `/blog/${p.slug.current}`),
    fallback: false,
  };
}