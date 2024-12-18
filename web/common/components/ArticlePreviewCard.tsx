import type { ArticleFrontmatter } from "@common/mdxLoader";
import { formatDate, postUrl } from "@common/utils/misc";
import Link from "next/link";
import { Pills } from "./Pill";
import Image from "next/image";

interface BlogPostCardProps {
  post: ArticleFrontmatter;
}

/** One item in a list of articles */
export function ArticlePreviewCard({ post }: BlogPostCardProps) {
  const date = post.releaseDate;
  const formattedDate = formatDate(date);

  return (
    <Link href={postUrl(post)}>
      <div className="flex group material-card h-[200px]">
        {post.titleImage && (
          <div className="h-full card overflow-hidden aspect-square">
              <Image width={400} height={400} src={post.titleImage} className="w-full h-full object-cover object-center" alt={post.summary ?? ""} />
          </div>
        )}
        <div className="p-4">
          <h2 className="text-3xl m-0 mb-2 group-hover:underline decoration-primary-40">
            {post.title}
          </h2>
          <div className="flex gap-4 text-md pb-3 font-semibold">
            <span className="">{formattedDate}</span>
          </div>
          <p className="two-line-text-ellipsis text-sm h-10 m-0">
            {post.summary}
          </p>
          <Pills texts={post.tags.map(({ label }) => label)} />
        </div>
      </div>
    </Link>
  );
}
