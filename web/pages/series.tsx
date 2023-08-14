import { GetStaticProps } from 'next';
import Link from 'next/link';

import { BlogpostDataLoader, BlogpostSeries } from '@common/utils/blogpost';
import Head from 'next/head';
import { Pill, Pills } from '@common/components/Pill';

export function SeriesCard({ series }: { series: BlogpostSeries }) {

    const postsList = series.posts.map(({ title, _id }: any) =>
        <li key={_id} className="">
            {title}
        </li>
    );

    return (
        <Link href={`/post/${series.slug}`}>
            <div className="group duration-100 w-full p-4 hover:bg-primary-40/[.08]">
                <h2 className="text-2xl mb-2 group-hover:underline decoration-primary-40">
                    {series.title}
                </h2>
                <Pills texts={series.tags.map((tag: any) => tag.label)}></Pills>
                <ol className='list-decimal mt-2 pl-4'>
                    {postsList}
                </ol>
            </div>
        </Link>
    )
}

export default function BlogListing({ seriesRaw }: any) {
    const series = seriesRaw.map((serie: any) => {
        return new BlogpostSeries(serie);
    });

    const seriesCards = series.map((series: BlogpostSeries) => (
        <li key={series.slug}>
            <SeriesCard series={series}></SeriesCard>
        </li>
    ))

    return (
        <>
            <Head>
                <title>Majer - post series</title>
            </Head>
            <h1 className='heading-primary'>The Blog</h1>
            <p className='mb-6'>Posts series</p>
            <ul className='flex flex-col divide-y'>
                {seriesCards}
            </ul>
        </>
    );
}

export const getStaticProps: GetStaticProps = async (context) => {

    const seriesRaw = await BlogpostDataLoader.getPostSeries();

    return {
        props: { seriesRaw },
    };
}
