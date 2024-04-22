import type * as Schema from "@common/sanityTypes";
import Link from "next/link";
import { Pills } from "./Pill";
import { GithubLogo } from "@common/svg/GithubLogo";

type RepoCardProps = {
  repo: Schema.RepositoryWithGithubData;
};

export const RepoCard = ({ repo }: RepoCardProps) => {
  console.dir(repo);
  const url = repo.imageUrl;
  return (
    <Link href={repo.link}>
      <div className="card surface-container-low group flex flex-col h-full">
        <div className="w-full h-48 rounded-xl overflow-hidden">
          {url ? (
            <img
              src={url}
              alt={repo.name}
              className="w-full h-full object-cover rounded-xl"
            />
          ) : (
            <div className="w-full h-full tertiary flex justify-center items-center">
              <GithubLogo className="w-16 h-16 fill-secondary group-hover:fill-secondary-60" />
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-xl group-hover:underline mb-2">{repo.name}</h3>
          <p className="text-sm mb-2 mt-0 three-line-text-ellipsis flex-grow">
            {repo.description}
          </p>
          <Pills texts={repo.technologies} />
        </div>
      </div>
    </Link>
  );
};
