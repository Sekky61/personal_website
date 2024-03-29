import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import { ParsedUrlQuery } from 'querystring';

import BlogPostCard from '@components/BlogPostCard';
import Pagination from '@components/Pagination';
import type * as Schema from "@common/sanityTypes";
import { getPaginatedPosts, getPostsCount } from '@common/utils/sanity/dataLoaders';

export const resultsPerPage = 10;

interface BlogListingProps {
    postsData: Schema.PostWithSeries[];
    postsCount: number;
    currentPage: number;
}

const BlogListing: NextPage<BlogListingProps> = ({ postsData, postsCount, currentPage }) => {
    const postsCards = postsData.map((post) => (
        <li key={post.slug.current}>
            <BlogPostCard post={post}></BlogPostCard>
        </li>
    ));

    return (
        <>
            <Head>
                <title>Majer - blog</title>
            </Head>
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
    page: string[]
}

// This function gets called at build time on server-side for each page.
export const getStaticProps: GetStaticProps<BlogListingProps, BlogPageParams> = async (context) => {
    const { page } = context.params!;        // non-null assert

    let pageNum;
    if (page === undefined || page.length === 0) { // NextJS changes page: [] to page: undefined
        // /blog
        pageNum = '1';
    } else {
        // /blog/1
        pageNum = page[0];
    }

    const currentPage = parseInt(pageNum) || 1;

    const from = (currentPage - 1) * resultsPerPage;
    const to = from + resultsPerPage;

    const postsData = await getPaginatedPosts(from, to);
    const postsCount = await getPostsCount();

    return {
        props: {
            postsData,
            postsCount,
            currentPage
        },
    };
}

// This function returns a list of page paths so that the pages can be pre-rendered.
// eg. /blog/1 -> {params: {page: ['blog', '1']}}
export const getStaticPaths: GetStaticPaths<BlogPageParams> = async () => {
    const postsCount = await getPostsCount();
    const pagesCount = Math.max(Math.ceil(postsCount / resultsPerPage), 1);  // At least one
    const pageNumbers = Array.from({ length: pagesCount }, (_, i) => i + 1); // Numbers 1..=pagesCount

    // Create an array of page paths, each containing a page number
    const pagePaths: { params: { page: string[] } }[] = pageNumbers.map((pageNumber: number) => ({ params: { page: [pageNumber.toString()] } }));
    // add the /blog path
    pagePaths.push({ params: { page: [] } });

    return {
        paths: pagePaths,
        fallback: false,
    };
}
