import { Blogpost } from "@common/utils/blogpost";
import Link from "next/link"

export default function BlogPostCard({ post }: { post: Blogpost }) {

  let newTags = post.data.tags;
  if (post.isPartOfSeries()) {
    // Concat doesn’t modify the original array
    newTags = post.data.tags.concat([{ label: "Series", value: "series" }]);
  }

  return (
    <Link href={`/post/${post.slug}`}>
      <div className="group duration-100 rounded-md drop-shadow bg-white dark:bg-white/5 w-full p-4">
        <h1 className="text-xl mb-4 group-hover:underline">
          {post.data.title}
        </h1>
        <div className="flex gap-1">
          {
            newTags.map(({ label, value }: any) =>
              <div key={value} className="tag-pill bg-primary-400 hover:bg-primary-500">
                {label}
              </div>
            )
          }
        </div>
      </div>
    </Link>
  )
}
