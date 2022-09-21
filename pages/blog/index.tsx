import Link from 'next/link';
import { getClient } from '@sanity/sanity.server';
import { groq } from 'next-sanity';

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
    const posts = await getClient(false).fetch(groq`*[_type == "post"]`);

    console.log(posts);

    const pages = posts.map((page: any) => ({
        title: page.title,
        slug: page.slug.current,
    }));

    return {
        props: { pages },
    };
}