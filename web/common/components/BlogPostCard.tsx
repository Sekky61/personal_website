import type * as Schema from "@common/sanityTypes";
import { getBeginningOfArticle, isPartOfSeries } from "@common/utils/blogpost";
import { formatDate } from "@common/utils/misc";
import Link from "next/link";
import { Pills } from "./Pill";

interface BlogPostCardProps {
  post: Schema.PostWithSeries;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  let tags = post.tags || [];
  if (isPartOfSeries(post)) {
    // Concat doesn’t modify the original array
    tags = tags.concat([{ label: "Series", value: "series" }]);
  }

  const date = new Date(post.releaseDate);
  const formattedDate = formatDate(date);

  const truncatedText = getBeginningOfArticle(post, 250);

  return (
    <Link href={`/post/${post.slug.current}`}>
      <div className="flex flex-col group duration-100 w-full p-4 hover:surface-cont-high">
        <h2 className="text-3xl m-0 mb-2 group-hover:underline decoration-primary-40">
          {post.title}
        </h2>
        <div className="flex gap-4 text-md pb-3 font-semibold">
          <span className="">{formattedDate}</span>
        </div>
        <p className="two-line-text-ellipsis text-sm h-10 m-0">
          {truncatedText}
        </p>
        <Pills texts={tags.map(({ label }) => label)} />
      </div>
    </Link>
  );
}
