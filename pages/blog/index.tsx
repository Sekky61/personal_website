import { getClient } from '@sanity/sanity.server';
import { groq } from 'next-sanity';
import BlogPostCard from '@common/components/BlogPostCard';

export default function Index({ posts_props }: any) {
    return (
        <div>
            <h1 className='text-3xl'>The Blog</h1>
            <p className='mb-6'>My most recent blog posts</p>
            <ul className='flex flex-col gap-5'>
                {posts_props.map((props: any) => (
                    <li key={props.slug}>
                        <BlogPostCard {...props}></BlogPostCard>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export async function getStaticProps() {
    const posts = await getClient().fetch(groq`*[_type == "post"] | order(_createdAt desc)`);

    const posts_props = posts.map((post: any) => ({
        title: post.title,
        slug: post.slug.current,
        tags: post.tags
    }));

    return {
        props: { posts_props },
    };
}