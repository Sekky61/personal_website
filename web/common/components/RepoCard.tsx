import { GithubLogo } from "@common/svg/GithubLogo";
import { ImageCard } from "./ImageCard";
import { Pills } from "./Pill";

type RepoCardProps = {
  repo: Repo;
};

type Repo = {
  name: string;
  link: string;
  description: string;
  technologies: string[];
  img: string | null;
  githubData: {
    name: string;
    description: string | null;
    updated_at: string;
    language: string;
  };
};

/**
 * A card component to display a repository.
 * Clicking on the card will redirect to the repository's GitHub page.
 * If no image is provided, a GitHub logo will be displayed.
 */
export const RepoCard = ({ repo }: RepoCardProps) => {
  const url = repo.img || "";
  return (
    <ImageCard
      imageUrl={url}
      imageAlt={repo.name}
      link={repo.link}
      imageMissingSvg={
        <GithubLogo className="w-16 h-16 fill-light-onSecondary dark:fill-dark-onSecondary" />
      }
      className="h-full"
    >
      <div className="p-4 grow flex flex-col">
        <h3 className="heading-medium group-hover:underline">{repo.name}</h3>
        <p className="text-sm three-line-text-ellipsis grow">
          {repo.description}
        </p>
        <Pills texts={repo.technologies} />
      </div>
    </ImageCard>
  );
};
