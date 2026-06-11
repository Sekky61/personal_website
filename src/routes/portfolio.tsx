import { RepositoryCard } from "@modules/portfolio";
import { createFileRoute } from "@tanstack/react-router";
import { getRepositories } from "../lib/content";
import { pageTitle } from "../lib/metadata/page-title";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      {
        title: pageTitle("Portfolio"),
      },
    ],
  }),
  loader: () => getRepositories(),
  component: Portfolio,
});

function Portfolio() {
  const projects = Route.useLoaderData();

  return (
    <>
      <h1 className="display-medium">My portfolio</h1>
      <p className="title-medium mt-0 mb-4">
        Here are some of the projects I have worked on.
      </p>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {projects.map((repo) => (
          <RepositoryCard repo={repo} key={repo.name} />
        ))}
      </div>
    </>
  );
}
