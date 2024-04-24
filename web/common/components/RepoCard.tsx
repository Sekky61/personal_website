import type * as Schema from "@common/sanityTypes";
import { Pills } from "./Pill";
import { GithubLogo } from "@common/svg/GithubLogo";
import { ImageCard } from "./ImageCard";

type RepoCardProps = {
  repo: Schema.RepositoryWithGithubData;
};

/**
 * A card component to display a repository.
 * Clicking on the card will redirect to the repository's GitHub page.
 * If no image is provided, a GitHub logo will be displayed.
 */
export const RepoCard = ({ repo }: RepoCardProps) => {
  console.dir(repo);
  const url = repo.imageUrl;
  return (
    <ImageCard
      imageUrl={url}
      imageAlt={repo.name}
      link={repo.link}
      imageMissingSvg={
        <GithubLogo className="w-16 h-16 fill-light-onSecondary dark:fill-dark-onSecondary" />
      }
    >
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-xl group-hover:underline">{repo.name}</h3>
        <p className="text-sm three-line-text-ellipsis flex-grow">
          {repo.description}
        </p>
        <Pills texts={repo.technologies} />
      </div>
    </ImageCard>
  );
};
