import { ElevatedCard } from "../../components/Card";
import { Pills } from "../../components/Pill";
import type { Repo } from "./repo";

export function RepositoryCard({ repo }: { repo: Repo }) {
  return (
    <a
      href={repo.link}
      target="_blank"
      rel="noreferrer noopener"
      className="block h-full no-underline"
    >
      <ElevatedCard className="image-card flex h-full flex-col">
        <div className="secondary-container m-4 mb-0 flex h-48 w-auto items-center justify-center overflow-hidden rounded-xl">
          {repo.img ? (
            <img
              src={repo.img}
              alt={repo.name}
              className="h-full w-full object-cover rounded-xl"
            />
          ) : (
            <div className="headline-small px-4 text-center font-semibold">
              {repo.githubData.name}
            </div>
          )}
        </div>

        <div className="grow p-4 pt-1">
          <h3 className="headline-small m-0 mb-2">{repo.name}</h3>
          <p className="three-line-text-ellipsis grow body-small mb-4">
            {repo.description}
          </p>
          <Pills texts={repo.technologies} />
        </div>
      </ElevatedCard>
    </a>
  );
}
