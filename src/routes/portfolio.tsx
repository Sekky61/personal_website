import { getRepositoriesByTiers, RepositoryCard } from "@modules/portfolio";
import { createFileRoute } from "@tanstack/react-router";
import { pageTitle } from "../lib/metadata/page-title";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      {
        title: pageTitle("Portfolio"),
      },
    ],
  }),
  loader: () => getRepositoriesByTiers(),
  component: Portfolio,
});

function Portfolio() {
  const projectsResult = Route.useLoaderData();

  if (projectsResult.isErr()) {
    throw new Error(projectsResult.error.message, projectsResult.error);
  }

  const projectsByTiers = projectsResult.value;

  return (
    <>
      <h1 className="display-medium">My portfolio</h1>
      <p className="title-medium mt-0 mb-4">
        Here are some of the projects I have worked on.
      </p>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {projectsByTiers.S?.map((repo) => (
          <RepositoryCard repo={repo} key={repo.name} />
        ))}
      </div>
      <h2 className="display-small mt-8">Below the fold</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {projectsByTiers.A?.map((repo) => (
          <RepositoryCard repo={repo} key={repo.name} />
        ))}
      </div>
    </>
  );
}
