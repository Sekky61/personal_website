import type * as Schema from "@common/sanityTypes";
import Link from "next/link";
import { Pills } from "./Pill";

type RepoCardProps = {
  repo: Schema.RepositoryWithGithubData;
};

export const RepoCard = ({ repo }: RepoCardProps) => {
  return (
    <Link href={repo.link}>
      <div className="p-4 card surface-container-low group flex flex-col h-full">
        <h3 className="text-xl group-hover:underline mb-2">{repo.name}</h3>
        <p className="text-sm mb-2 mt-0 three-line-text-ellipsis flex-grow">
          {repo.description}
        </p>
        <Pills texts={repo.technologies} />
      </div>
    </Link>
  );
};
