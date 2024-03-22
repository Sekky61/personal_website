import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { PortableText } from '@portabletext/react';
import { blockRenderingElements } from '@common/utils/blockRendering';
import RepoCard from '@common/components/RepoCard';
import type * as Schema from "@common/sanityTypes";
import { getPortfolio } from '@common/utils/sanity/dataLoaders';

type PageProps = {
    portfolio: Schema.LoadedPortfolio
}

const Portfolio: NextPage<PageProps> = ({ portfolio }) => {
    const { projects, text } = portfolio;
    return (
        <>
            <Head>
                <title>Majer - portfolio</title>
            </Head>
            <h1 className='heading-primary'>My portfolio</h1>
            <PortableText
                value={text}
                components={blockRenderingElements}
            />
            <h2 className='metablock-heading'>Highlighted repositories</h2>
            <div className="grid grid-cols-3 gap-2">
                {
                    projects.map((repo) => {
                        return (<RepoCard repo={repo} key={repo.name} />);
                    })
                }
            </div>
        </>
    )
}

// Load data for highlighted repositories
export const getStaticProps: GetStaticProps<PageProps> = async () => {
    const portfolio = await getPortfolio();

    return {
        props: {
            portfolio
        }
    }
}

export default Portfolio