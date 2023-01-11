import { Blogpost } from "@common/utils/blogpost";
import Link from "next/link"

export default function BlogPostCard({ post }: { post: Blogpost }) {

  let newTags = post.data.tags;
  if (post.isPartOfSeries()) {
    // Concat doesn’t modify the original array
    newTags = post.data.tags.concat([{ label: "Series", value: "series" }]);
  }

  let truncatedText = post.getBeginningOfArticle(250);

  return (
    <Link href={`/post/${post.slug}`}>
      <div className="group duration-100 w-full p-4 hover:bg-primary-40/[.08]">
        <h2 className="text-2xl mb-2 group-hover:underline decoration-primary-40">
          {post.data.title}
        </h2>
        <p className="two-line-text-ellipsis h-12">
          {truncatedText}
        </p>
        <div className="flex gap-1 h-7">
          {
            newTags.map(({ label, value }: any) =>
              <div key={value} className="tag-pill">
                {label}
              </div>
            )
          }
        </div>
      </div>
    </Link>
  )
}
