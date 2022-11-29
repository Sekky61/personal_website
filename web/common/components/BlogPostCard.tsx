import Link from "next/link"

export default function BlogPostCard({ title, slug, tags }: any) {
  return (
    <Link href={`/post/${slug}`}>
      <div className="duration-100 rounded bg-slate-100 dark:bg-zinc-900 w-full p-6 border border-primary-100 hover:border-primary-300">
        <h1 className="text-xl">
          {title}
        </h1>
        <div className="flex gap-1 mt-2">
          {
            tags.map(({ label, value }: any) =>
              <div key={value} className="rounded-full bg-primary-200 hover:bg-primary-300 dark:text-black text-sm px-2 py-0.5 border border-black">
                {label}
              </div>
            )}
        </div>
      </div>
    </Link>
  )
}