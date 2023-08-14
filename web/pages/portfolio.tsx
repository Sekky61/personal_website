import { blockRenderingElements } from '@common/utils/blockRendering';
import { RepositoriesLoader, Repository } from '@common/utils/blogpost';
import { PortableText } from '@portabletext/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

interface RepoCardProps {
    repo: Repository;
}

const RepoCard = ({ repo }: RepoCardProps) => {
    const technologiesPills = repo.technologies.map((tech: string) => {
        return (
            <div className='tag-pill' key={tech}>
                {tech}
            </div>
        );
    });

    return (
        <Link href={repo.link} className='p-4 card group flex flex-col h-full'>
            <h3 className='text-xl group-hover:underline mb-2'>{repo.name}</h3>
            <p className='mb-2 mt-0 three-line-text-ellipsis flex-grow'>{repo.description}</p>
            <div className="flex gap-2 flex-wrap">
                {technologiesPills}
            </div>
        </Link >
    )
}

const Portfolio: NextPage = ({ portfolio }: any) => {
    const { projects, text } = portfolio;

    const repoCards = projects.map((repo: Repository) => {
        return (<RepoCard repo={repo} key={repo.name} />);
    });

    return (
        <>
            <Head>
                <title>Majer - portfolio</title>
            </Head>
            <h1 className='heading-primary' >My portfolio</h1>
            <PortableText
                value={text}
                components={blockRenderingElements}
            />
            <h2 className='metablock-heading'>Highlighted repositories</h2>
            <div className="grid grid-cols-3 gap-2">
                {repoCards}
            </div>
        </>
    )
}

// Load data for highlighted repositories
export const getStaticProps = async () => {
    const portfolio = await RepositoriesLoader.getPortfolio();

    return {
        props: {
            portfolio
        }
    }
}

export default Portfolio