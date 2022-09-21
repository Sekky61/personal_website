import Link from "next/link"
import { NextPage } from "next/types"
import useDarkMode from "../hooks/useDarkMode";

export default function BlogPostCard({ title, href, tags }: any) {
  console.dir(tags);
  return (
    <Link href={href}>
      <a>
        <div className="duration-100 rounded bg-slate-100 p-6 border border-primary-100 hover:border-primary-300">
          <h1 className="text-xl">
            {title}
          </h1>
          {/* {tags.map((tag: any) => {
            console.dir(tag)
            return (<div>
              Tag {tag.name}
            </div>);
          })} */}
        </div>
      </a>
    </Link>
  )
}