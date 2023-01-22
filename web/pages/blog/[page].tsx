import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import BlogPostCard from '@components/BlogPostCard';
import Pagination from '@components/Pagination';
import { Blogpost, BlogpostDataLoader } from '@common/utils/blogpost';
import Link from 'next/link';
import { ParsedUrlQuery } from 'querystring';

export const resultsPerPage = 10;

interface BlogListingProps {
    postsData: any;
    postsCount: number;
    currentPage: number;
}

const BlogListing: NextPage<BlogListingProps> = ({ postsData, postsCount, currentPage }) => {
    const posts = postsData.map((data: any) => {
        return new Blogpost(data);
    });

    const postsCards = posts.map((post: Blogpost) => (
        <li key={post.slug}>
            <BlogPostCard post={post}></BlogPostCard>
        </li>
    ));

    return (
        <>
            <h1 className='heading-primary'>The Blog</h1>
            <p className='mb-6'>
                Or check out blogposts sorted by <Link href={`/series`} className="link">series</Link>
            </p>
            <ul className='flex flex-col divide-y'>
                {postsCards}
            </ul>
            <div className='pt-4'>
                <Pagination currentPage={currentPage} perPage={resultsPerPage} total={postsCount} pathPrefix="/blog"></Pagination>
            </div>
        </>
    );
}

export default BlogListing;

interface BlogPageParams extends ParsedUrlQuery {
    page: string
}

// This function gets called at build time on server-side for each page.
export const getStaticProps: GetStaticProps<BlogListingProps, BlogPageParams> = async (context) => {
    const { page } = context.params!;        // non-null assert
    const currentPage = parseInt(page) || 1; // /blog gets treated as /blog/1

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
    };
}

// This function returns a list of page paths so that the pages can be pre-rendered.
export const getStaticPaths: GetStaticPaths<BlogPageParams> = async () => {
    const postsCount = await BlogpostDataLoader.getPostsCount();
    const pagesCount = Math.max(Math.ceil(postsCount / resultsPerPage), 1);  // At least one
    const pageNumbers = Array.from({ length: pagesCount }, (_, i) => i + 1); // Numbers 1..=pagesCount

    // Create an array of page paths, each containing a page number
    const pagePaths = pageNumbers.map((pageNumber: number) => ({ params: { page: pageNumber.toString() } }));

    return {
        paths: pagePaths,
        fallback: false,
    };
}
