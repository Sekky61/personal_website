import { GetStaticPaths, GetStaticProps } from 'next';

import BlogPostCard from '@components/BlogPostCard';
import Pagination from '@components/Pagination';
import { Blogpost, BlogpostLoader } from '@common/utils/blogpost';
import Link from 'next/link';

export const resultsPerPage = 10;

// TODO disallow navigating to nonexisting page (/blog/999)
export default function BlogListing({ posts_props, posts_count, page }: any) {
    return (
        <>
            <h1 className='heading-primary'>The Blog</h1>
            <p className='mb-6'>My most recent blog posts</p>
            <p>
                Check out blog posts sorted by <Link href={`/series`}>series</Link>
            </p>
            <ul className='flex flex-col gap-4'>
                {posts_props.map((post: Blogpost) => (
                    <li key={post.data.slug}>
                        <BlogPostCard post={post}></BlogPostCard>
                    </li>
                ))}
            </ul>
            <div className='pt-4'>
                <Pagination currentPage={page} perPage={resultsPerPage} total={posts_count} pathPrefix="/blog"></Pagination>
            </div>
        </>
    );
}

export const getStaticProps: GetStaticProps = async (context) => {
    const page_str = context?.params?.page as string;
    const page = parseInt(page_str) || 1;

    const from = (page - 1) * resultsPerPage;
    const to = from + resultsPerPage;

    const posts = await BlogpostLoader.getPaginatedPosts(from, to);
    const posts_count = await BlogpostLoader.getPostsCount();

    return {
        props: {
            posts_props: JSON.parse(JSON.stringify(posts)), // todo workaround
            posts_count, page
        },
        revalidate: 3600,
    };
}

export const getStaticPaths: GetStaticPaths = async () => {
    const posts_count = await BlogpostLoader.getPostsCount();
    const pages_count = Math.max(Math.ceil(posts_count / resultsPerPage), 1); // at least one

    return {
        paths: Array.from({ length: pages_count }, (_, i) => i + 1).map((page: number) => ({ params: { page: page.toString() } })),
        fallback: false,
    };
}