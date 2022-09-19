import Link from 'next/link';
import { getSanityContent } from '../../utils/sanity';

export default function Index({ pages }: any) {
    return (
        <div>
            <h1>This Site Loads MDX From Sanity.io</h1>
            <p>View any of these pages to see it in action:</p>
            <ul>
                {pages.map(({ title, slug }: any) => (
                    <li key={slug}>
                        <Link href={`/posts/${slug}`}>
                            <a>{title}</a>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export async function getStaticProps() {
    const data = await getSanityContent({
        query: `
      query AllPages {
        allPage {
          title
          slug {
            current
          }
        }
      }
    `,
    });

    const pages = data.allPage.map((page: any) => ({
        title: page.title,
        slug: page.slug.current,
    }));

    return {
        props: { pages },
    };
}