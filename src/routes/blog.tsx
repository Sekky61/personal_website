import { createFileRoute } from "@tanstack/react-router";
import { ArticlePreviewCard } from "../components/ArticlePreviewCard";
import { getArticlePreviews } from "../lib/content";
import { pageTitle } from "../lib/metadata/page-title";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      {
        title: pageTitle("Blog"),
      },
    ],
  }),
  loader: () => getArticlePreviews(),
  component: BlogListing,
});

function BlogListing() {
  const posts = Route.useLoaderData();

  return (
    <>
      <h1 className="display-medium mb-8">The Blog</h1>
      <ul className="flex flex-col gap-6">
        {posts.map((post) => (
          <li key={post.slug}>
            <ArticlePreviewCard post={post} />
          </li>
        ))}
      </ul>
    </>
  );
}
