import Link from "next/link"
import { formatDate } from "@common/utils/misc";
import { Pill } from "./Pill";
import { getBeginningOfArticle, isPartOfSeries } from "@common/utils/blogpost";
import type * as Schema from "@common/sanityTypes";

interface BlogPostCardProps {
  post: Schema.PostWithSeries
}

export default function BlogPostCard({ post }: BlogPostCardProps) {

  let tags = post.tags || [];
  if (isPartOfSeries(post)) {
    // Concat doesn’t modify the original array
    tags = tags.concat([{ label: "Series", value: "series" }]);
  }

  const date = new Date(post.releaseDate);
  const formattedDate = formatDate(date);

  let truncatedText = getBeginningOfArticle(post, 250);

  return (
    <Link href={`/post/${post.slug.current}`}>
      <div className="flex flex-col gap-1 group duration-100 w-full px-4 py-2 hover:bg-primary-40/[.08]">
        <h2 className="text-2xl mb-1 group-hover:underline decoration-primary-40">
          {post.title}
        </h2>
        <div className="flex gap-4 primary-text text-sm font-semibold">
          <span>Article</span>
          <span className=''>{formattedDate}</span>
        </div>
        <p className="two-line-text-ellipsis h-12 m-0">
          {truncatedText}
        </p>
        <div className="flex gap-2 h-7">
          {
            tags.map(({ label, value }: any) =>
              <Pill key={label} text={label}></Pill>
            )
          }
        </div>
      </div>
    </Link>
  )
}
