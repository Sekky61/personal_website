import type * as Schema from "@common/sanityTypes";
import Link from "next/link";
import { Pill } from "./Pill";

type RepoCardProps = {
  repo: Schema.RepositoryWithGithubData;
};

const RepoCard = ({ repo }: RepoCardProps) => {
  const technologiesPills = repo.technologies.map((tech) => {
    return <Pill key={tech} text={tech} />;
  });

  return (
    <Link href={repo.link} className="p-4 card group flex flex-col h-full">
      <h3 className="text-xl group-hover:underline mb-2">{repo.name}</h3>
      <p className="mb-2 mt-0 three-line-text-ellipsis flex-grow">
        {repo.description}
      </p>
      <div className="flex gap-2 flex-wrap">{technologiesPills}</div>
    </Link>
  );
};

export default RepoCard;
