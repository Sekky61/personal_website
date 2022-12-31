import { Blogpost } from "@common/utils/blogpost";
import Link from "next/link"

export default function BlogPostCard({ post }: { post: Blogpost }) {
  const is_in_series = post.data.series.length != 0;

  let newTags;
  if (is_in_series) {
    // This is good, concat doesn’t modify the original array
    newTags = post.data.tags.concat([{ label: "Series", value: "series" }]);
  } else {
    newTags = post.data.tags;
  }

  return (
    <Link href={`/post/${post.data.slug.current}`}>
      <div className="group duration-100 rounded-md bg-slate-100 dark:bg-zinc-800 w-full p-4">
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
