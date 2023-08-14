import { Blogpost } from "@common/utils/blogpost";
import { formatDate } from "@common/utils/misc";
import Link from "next/link"
import { Pill } from "./Pill";

export default function BlogPostCard({ post }: { post: Blogpost }) {

  let newTags = post.data.tags;
  if (post.data.tags === undefined) newTags = [];
  if (post.isPartOfSeries()) {
    // Concat doesn’t modify the original array
    newTags = post.data.tags.concat([{ label: "Series", value: "series" }]);
  }

  const date = post.releaseDate;
  const formattedDate = formatDate(date);

  let truncatedText = post.getBeginningOfArticle(250);

  return (
    <Link href={`/post/${post.slug}`}>
      <div className="flex flex-col gap-1 group duration-100 w-full px-4 py-2 hover:bg-primary-40/[.08]">
        <h2 className="text-2xl mb-1 group-hover:underline decoration-primary-40">
          {post.data.title}
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
            newTags.map(({ label, value }: any) =>
              <Pill key={label} text={label}></Pill>
            )
          }
        </div>
      </div>
    </Link>
  )
}
