import { GetStaticProps } from 'next';
import Link from 'next/link';

import { BlogpostDataLoader } from '@common/utils/blogpost';

export const resultsPerPage = 10;

export function SeriesCard({ title, slug, tags, posts, ...rest }: any) {
    return (
        <Link href={`/post/${slug.current}`}>
            <div className="duration-100 rounded-md bg-slate-100 dark:bg-zinc-900 w-full p-6 border border-primary-100 hover:border-primary-300">
                <h1 className="text-xl">
                    {title}
                </h1>
                <div className="flex gap-1 my-2">
                    {
                        tags.map(({ label, value }: any) =>
                            <div key={value} className="tag-pill bg-primary-200 hover:bg-primary-300">
                                {label}
                            </div>
                        )
                    }
                </div>
                <ol className='list-decimal'>
                    {
                        posts.map(({ title, _id }: any) =>
                            <li key={_id} className="">
                                {title}
                            </li>
                        )
                    }
                </ol>
            </div>
        </Link>
    )
}

export default function BlogListing({ series }: any) {
    return (
        <>
            <h1 className='heading-primary'>The Blog</h1>
            <p className='mb-6'>Posts series</p>
            <ul className='flex flex-col gap-5'>
                {series.map((props: any) => (
                    <li key={props.slug}>
                        <SeriesCard {...props}></SeriesCard>
                    </li>
                ))}
            </ul>
        </>
    );
}

export const getStaticProps: GetStaticProps = async (context) => {

    const series = await BlogpostDataLoader.getPostSeries();

    return {
        props: { series },
        revalidate: 3600,
    };
}
