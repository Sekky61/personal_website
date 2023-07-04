import { blockRenderingElements } from '@common/utils/blockRendering';
import { RepositoriesLoader, Repository } from '@common/utils/blogpost';
import { PortableText } from '@portabletext/react';
import type { NextPage } from 'next';
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
        <div className="p-3 card group">
            <Link href={repo.link} className=' flex flex-col h-full'>
                <h3 className='text-xl group-hover:underline mb-4'>{repo.name}</h3>
                <p className='mb-2 mt-0 three-line-text-ellipsis flex-grow'>{repo.description}</p>
                <div className="flex gap-2 h-7">
                    {technologiesPills}
                </div>
            </Link >
        </div >
    )
}

const Portfolio: NextPage = ({ portfolio }: any) => {
    const { projects, text } = portfolio;

    const repoCards = projects.map((repo: Repository) => {
        return (<RepoCard repo={repo} key={repo.name} />);
    });

    return (
        <>
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