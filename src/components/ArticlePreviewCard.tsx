import { Link } from '@tanstack/react-router'
import type { ArticlePreview } from '../lib/content'
import { formatDate } from '../lib/content'
import { ElevatedCard } from './Card'
import { Pill, Pills } from './Pill'

export function ArticlePreviewCard({ post }: { post: ArticlePreview }) {
  return (
    <Link to="/post/$slug" params={{ slug: post.slug }} className="block no-underline">
      <ElevatedCard className="group flex flex-col md:h-48 md:flex-row">
        {post.titleImage ? (
          <div className="surface-container-high relative h-30 w-full shrink-0 overflow-hidden rounded-t-medium md:h-full md:w-[200px] md:rounded-l-medium md:rounded-r-none">
            <img
              src={post.titleImage}
              className="h-full w-full object-cover object-center"
              alt={post.summary ?? post.title}
            />
          </div>
        ) : null}

        <div className="flex flex-1 flex-col gap-3 p-4">
          <div className="flex items-start justify-between gap-3">
            <h2 className="m-0 text-3xl group-hover:underline decoration-primary-40">
              {post.title}
            </h2>
            {!post.published ? <Pill>Draft</Pill> : null}
          </div>

          <div className="flex flex-wrap gap-4 pb-1 text-md font-semibold">
            <span>{formatDate(post.releaseDate)}</span>
            <span>{post.readingTime}</span>
          </div>

          <p className="two-line-text-ellipsis m-0 h-10 text-sm">{post.summary}</p>

          {post.headings.length > 0 ? (
            <Pills texts={post.headings.slice(0, 3).map((heading) => heading.value)} />
          ) : null}
        </div>
      </ElevatedCard>
    </Link>
  )
}
