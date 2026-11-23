import { getRepositoriesByTiers, RepositoryCard } from "@modules/portfolio";
import { createFileRoute } from "@tanstack/react-router";
import { pageTitle } from "../lib/metadata/page-title";
import { ProfessionalWork } from "../modules/portfolio/components/ProfessionalWork";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      {
        title: pageTitle("Portfolio"),
      },
    ],
  }),
  loader: () => {
    const projectsResult = getRepositoriesByTiers();

    if (projectsResult.isErr()) {
      throw new Error(projectsResult.error.message, projectsResult.error);
    }

    return projectsResult.value;
  },
  component: Portfolio,
});

function Portfolio() {
  const projectsByTiers = Route.useLoaderData();

  return (
    <>
      <h1 className="display-medium">My portfolio</h1>
      <p className="title-medium mt-0 mb-4">
        A selection of my professional work and personal projects.
      </p>
      <ProfessionalWork />
      <h2 className="display-small mt-8 mb-4">Personal projects</h2>
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
