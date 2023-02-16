import { RepositoriesLoader, Repository } from '@common/utils/blogpost';
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
            <Link href={repo.link}>
                <h3 className='text-xl group-hover:underline mb-4'>{repo.name}</h3>
                <p className='mb-4'>{repo.description}</p>
                <div className="flex">
                    {technologiesPills}
                </div>
            </Link>
        </div>
    )
}



const Portfolio: NextPage = ({ repos }: any) => {
    const repoCards = repos.map((repo: Repository) => {
        return (<RepoCard repo={repo} key={repo.name} />);
    });

    return (
        <>
            <h1 className='heading-primary' >My portfolio</h1>
            <p className='mb-8'>This is my portfolio.</p>
            <h2 className='metablock-heading'>Highlighted repositories</h2>
            <div className="grid grid-cols-3 gap-2">
                {repoCards}
            </div>
        </>
    )
}

// Load data for highlighted repositories
export const getStaticProps = async () => {
    const repos = await RepositoriesLoader.getRepositories();

    return {
        props: {
            repos
        }
    }
}

export default Portfolio