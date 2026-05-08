import { createFileRoute, notFound } from "@tanstack/react-router";
import { formatDate, getArticleBySlug } from "../lib/content";
import { pageTitle } from "../lib/metadata/page-title";
import { postTitleImageViewTransitionName } from "../modules/view-transitions/helpers/post-title-image-view-transition-name";
import { postTitleViewTransitionName } from "../modules/view-transitions/helpers/post-title-view-transition-name";

export const Route = createFileRoute("/post/$slug")({
  loader: ({ params }) => {
    const article = getArticleBySlug(params.slug);

    if (!article) {
      throw notFound();
    }

    return {
      slug: article.slug,
      title: article.title,
      published: article.published,
      releaseDate: article.releaseDate,
      summary: article.summary,
      titleImage: article.titleImage,
      readingTime: article.readingTime,
      headings: article.headings,
    };
  },
  head: ({ loaderData }) => {
    const title = pageTitle(loaderData?.title ?? "Post");
    const description = loaderData?.summary ?? "A blog post by Majer.";

    return {
      meta: [
        {
          title,
        },
        {
          name: "description",
          content: description,
        },
      ],
    };
  },
  component: ArticlePage,
});

function ArticlePage() {
  const articlePreview = Route.useLoaderData();
  const article = getArticleBySlug(articlePreview.slug);

  if (!article) {
    throw notFound();
  }

  const Content = article.Content;

  return (
    <article className="article">
      <h1 className="display-large">
        <span
          style={{
            viewTransitionName: postTitleViewTransitionName(
              articlePreview.slug,
            ),
          }}
        >
          {articlePreview.title}
        </span>
      </h1>

      <div className="mb-6 mt-4 flex flex-wrap gap-x-4 gap-y-1 font-semibold">
        <span>{formatDate(articlePreview.releaseDate)}</span>
        <span>{articlePreview.readingTime}</span>
        {!articlePreview.published ? <span>Draft</span> : null}
      </div>

      {articlePreview.titleImage ? (
        <div
          className="relative mb-8 aspect-[3/1] w-full overflow-hidden rounded-[2rem]"
          style={{
            viewTransitionName: postTitleImageViewTransitionName(
              articlePreview.slug,
            ),
          }}
        >
          <img
            alt={articlePreview.title}
            src={articlePreview.titleImage}
            className="h-full w-full object-cover"
          />
        </div>
      ) : null}

      {articlePreview.summary ? (
        <p className="headline-small mb-8 max-w-3xl">
          {articlePreview.summary}
        </p>
      ) : null}

      <Content />
    </article>
  );
}
