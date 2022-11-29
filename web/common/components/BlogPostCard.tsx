import Link from "next/link"
import { NextPage } from "next/types"
import useDarkMode from "../hooks/useDarkMode";

export default function BlogPostCard({ title, slug, tags }: any) {
  return (
    <Link href={`/post/${slug}`}>
      <div className="duration-100 rounded bg-slate-100 w-full p-6 border border-primary-100 hover:border-primary-300">
        <h1 className="text-xl">
          {title}
        </h1>
        <div className="flex gap-1 mt-2">
          {
            tags.map(({ label, value }: any) =>
              <div key={value} className="rounded-full bg-primary-200 hover:bg-primary-300 text-sm px-2 py-0.5 border border-black">
                {label}
              </div>
            )}
        </div>
      </div>
    </Link>
  )
}