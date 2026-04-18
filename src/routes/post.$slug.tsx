import { createFileRoute, notFound } from '@tanstack/react-router'
import { DeferredContent } from '../components/DeferredContent'
import { getArticleBySlug } from '../lib/content'
import { formatDate } from '../lib/content'

export const Route = createFileRoute('/post/$slug')({
  loader: ({ params }) => {
    const article = getArticleBySlug(params.slug)

    if (!article) {
      throw notFound()
    }

    return article
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: `${loaderData.title} | Majer`,
      },
      {
        name: 'description',
        content: loaderData.summary ?? 'A blog post by Majer.',
      },
    ],
  }),
  component: ArticlePage,
})

function ArticlePage() {
  const article = Route.useLoaderData()

  return (
    <article className="article">
      <h1 className="display-large">{article.title}</h1>

      <div className="mb-6 mt-4 flex flex-wrap gap-x-4 gap-y-1 font-semibold">
        <span>{formatDate(article.releaseDate)}</span>
        <span>{article.readingTime}</span>
        {!article.published ? <span>Draft</span> : null}
      </div>

      {article.titleImage ? (
        <div className="relative mb-8 aspect-[3/1] w-full overflow-hidden rounded-[2rem]">
          <img
            alt={article.title}
            src={article.titleImage}
            className="h-full w-full object-cover"
          />
        </div>
      ) : null}

      {article.summary ? (
        <p className="headline-small mb-8 max-w-3xl">{article.summary}</p>
      ) : null}

      {article.headings.length > 0 ? (
        <section className="surface-container-low elevation-1 shape-medium mb-8 p-6">
          <h2 className="title-large mb-4">Sections detected in copied source</h2>
          <ul className="list-bullet ml-4">
            {article.headings.map((heading) => (
              <li key={heading.slug}>{heading.value}</li>
            ))}
          </ul>
        </section>
      ) : null}

      <DeferredContent
        title="Article source copied"
        description="This route, metadata, and assets are migrated. MDX rendering, math blocks, and rich code samples are intentionally deferred to the next iteration."
        source={article.source}
        defaultOpen
      />
    </article>
  )
}
