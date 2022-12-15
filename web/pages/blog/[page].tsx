import { GetStaticPaths, GetStaticProps } from 'next';

import BlogPostCard from '@components/BlogPostCard';
import Pagination from '@components/Pagination';
import article from '@common/utils/article';

export const resultsPerPage = 10;

// TODO disallow navigating to nonexisting page (/blog/999)
export default function BlogListing({ posts_props, posts_count, page }: any) {
    return (
        <>
            <h1 className='heading-primary'>The Blog</h1>
            <p className='mb-6'>My most recent blog posts</p>
            <ul className='flex flex-col gap-5'>
                {posts_props.map((props: any) => (
                    <li key={props.slug}>
                        <BlogPostCard {...props}></BlogPostCard>
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

    const posts = await article.getPaginatedPosts(from, to);
    const posts_count = await article.getPostsCount();

    return {
        props: { posts_props: posts, posts_count, page },
        revalidate: 3600,
    };
}

export const getStaticPaths: GetStaticPaths = async () => {
    const posts_count = await article.getPostsCount();
    const pages_count = Math.max(Math.ceil(posts_count / resultsPerPage), 1); // at least one

    return {
        paths: Array.from({ length: pages_count }, (_, i) => i + 1).map((page: number) => ({ params: { page: page.toString() } })),
        fallback: false,
    };
}