import Link from "next/link"

export default function BlogPostCard({ title, slug, tags, ...rest }: any) {
  const is_in_series = rest.series.length != 0;

  return (
    <Link href={`/post/${slug}`}>
      <div className="duration-100 rounded bg-slate-100 dark:bg-zinc-900 w-full p-6 border border-primary-100 hover:border-primary-300">
        <h1 className="text-xl">
          {title}
        </h1>
        <div className="flex gap-1 mt-2">
          {
            is_in_series ?
              <div className="tag-pill bg-primary-400 hover:bg-primary-500">
                Series
              </div>
              : <></>
          }
          {
            tags.map(({ label, value }: any) =>
              <div key={value} className="tag-pill bg-primary-200 hover:bg-primary-300">
                {label}
              </div>
            )
          }
        </div>
      </div>
    </Link>
  )
}