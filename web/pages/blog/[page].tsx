import { GetStaticPaths, GetStaticProps } from 'next';

import BlogPostCard from '@components/BlogPostCard';
import Pagination from '@components/Pagination';
import { Blogpost, BlogpostDataLoader } from '@common/utils/blogpost';
import Link from 'next/link';

export const resultsPerPage = 10;

// TODO disallow navigating to nonexisting page (/blog/999)
export default function BlogListing({ postsData, postsCount, currentPage }: any) {
    const posts = postsData.map((data: any) => {
        return new Blogpost(data);
    });

    return (
        <>
            <h1 className='heading-primary'>The Blog</h1>
            <p className='mb-6'>My most recent blog posts</p>
            <p>
                Check out blog posts sorted by <Link href={`/series`}>series</Link>
            </p>
            <ul className='flex flex-col gap-4'>
                {posts.map((post: Blogpost) => (
                    <li key={post.slug}>
                        <BlogPostCard post={post}></BlogPostCard>
                    </li>
                ))}
            </ul>
            <div className='pt-4'>
                <Pagination currentPage={currentPage} perPage={resultsPerPage} total={postsCount} pathPrefix="/blog"></Pagination>
            </div>
        </>
    );
}

export const getStaticProps: GetStaticProps = async (context) => {
    const pageQuery = context?.params?.page as string;
    const currentPage = parseInt(pageQuery) || 1;

    const from = (currentPage - 1) * resultsPerPage;
    const to = from + resultsPerPage;

    const postsData = await BlogpostDataLoader.getPaginatedPosts(from, to);
    const postsCount = await BlogpostDataLoader.getPostsCount();

    return {
        props: {
            postsData,
            postsCount,
            currentPage
        },
        revalidate: 3600,
    };
}

export const getStaticPaths: GetStaticPaths = async () => {
    const postsCount = await BlogpostDataLoader.getPostsCount();
    const pagesCount = Math.max(Math.ceil(postsCount / resultsPerPage), 1); // at least one

    return {
        paths: Array.from({ length: pagesCount }, (_, i) => i + 1).map((page: number) => ({ params: { page: page.toString() } })),
        fallback: false,
        // TODO look into revalidate
    };
}