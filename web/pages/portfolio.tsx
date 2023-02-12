import { getClient } from '@common/utils/sanity/sanity.server'
import type { NextPage } from 'next'
import Link from 'next/link';

interface RepoCardProps {
    repo: RepoCard;
}

interface RepoCard {
    name: string;
    link: string;
    description: string;
    technologies: string[];
}

const RepoCard = ({ repo }: RepoCardProps) => {
    const { name, link, description, technologies } = repo;
    console.log(name);
    return (
        <div className="p-2 card group">
            <Link href={link}>
                <h3 className='text-xl group-hover:underline'>{name}</h3>
                <p>{description}</p>
            </Link>
        </div>
    )
}



const Portfolio: NextPage = ({ repos }: any) => {
    console.log(repos);

    const repoCards = repos.map((repo: RepoCard) => {
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

// load data from sanity
export const getStaticProps = async () => {
    const repos = await getClient().fetch(`*[_type == "repository"]`);

    return {
        props: {
            repos
        }
    }
}

export default Portfolio