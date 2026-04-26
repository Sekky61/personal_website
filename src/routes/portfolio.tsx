import { createFileRoute } from "@tanstack/react-router";
import { RepoCard } from "../components/RepoCard";
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
      <h1 className="display-medium mb-4">My portfolio</h1>
      <p>Here are some of the projects I have worked on.</p>
      <h2 className="headline-medium my-6">Highlighted Repositories</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {projects.map((repo) => (
          <RepoCard repo={repo} key={repo.name} />
        ))}
      </div>
    </>
  );
}
