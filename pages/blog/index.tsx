import Link from 'next/link';
import { getSanityContent } from '../../common/utils/sanity';
import { createClient, groq } from 'next-sanity'

export default function Index({ pages }: any) {
    return (
        <div>
            <h1>This Site Loads MDX From Sanity.io</h1>
            <p>View any of these pages to see it in action:</p>
            <ul>
                {pages.map(({ title, slug }: any) => (
                    <li key={slug}>
                        <Link href={`/blog/${slug}`}>
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

    const client = createClient({
        projectId: '3q20z5w8',
        dataset: 'production',
        apiVersion: '2022-08-25',
        useCdn: false,
        token: process.env.SANITY_API_TOKEN,
    })

    const x = await client.fetch(
        groq`*[_type == "post"]`
    )
    console.log(x)

    let ddd = await fetch("https://3q20z5w8.api.sanity.io/v2022-08-25/data/query/production?query=*[_type == 'post']");

    console.log(ddd)

    const pages = data.allPage.map((page: any) => ({
        title: page.title,
        slug: page.slug.current,
    }));

    return {
        props: { pages },
    };
}