import { getSanityContent } from '../../utils/sanity';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote'
import Callout from '../../components/Callout';
import CodeSample from '../../components/CodeSample';

export default function Page({ title, content }: any) {
  return (
    <div>
      <h1>{title}</h1>
      <MDXRemote {...content} components={{ Callout, code: CodeSample }} />
    </div>
  );
}

export async function getStaticProps({ params }: any) {

  const data = await getSanityContent({
    query: `
           query PageBySlug($slug: String!) {
             allPage(where: { slug: { current: { eq: $slug } } }) {
               title
               content
             }
           }
         `,
    variables: {
      slug: params.slug,
    },
  });

  const [pageData] = data.allPage;

  const content = await serialize(pageData.content);

  return {
    props: {
      title: pageData.title,
      content,
    },
  };
}

export async function getStaticPaths() {
  const data = await getSanityContent({
    query: `
      query AllPages {
        allPage {
          slug {
            current
          }
        }
      }
    `,
  });

  const pages = data.allPage;

  return {
    paths: pages.map((p: any) => `/blog/${p.slug.current}`),
    fallback: false,
  };
}