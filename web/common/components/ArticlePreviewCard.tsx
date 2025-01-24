import type { ArticleFrontmatter } from "@common/mdxLoader";
import { formatDate, postUrl } from "@common/utils/misc";
import Image from "next/image";
import Link from "next/link";
import { ElevatedCard } from "./Card";
import { Pills } from "./Pill";

interface BlogPostCardProps {
  post: ArticleFrontmatter;
}

/** One item in a list of articles */
export function ArticlePreviewCard({ post }: BlogPostCardProps) {
  const date = post.releaseDate;
  const formattedDate = formatDate(date);

  // The image rounding of 12px is copied from stylesheet
  return (
    <Link href={postUrl(post)}>
      <ElevatedCard className="flex group h-48">
        {post.titleImage && (
          <div className="h-full shrink-0 overflow-hidden aspect-square rounded-l-medium">
            <Image
              width={400}
              height={400}
              src={post.titleImage}
              className="h-full object-cover object-center"
              alt={post.summary ?? ""}
            />
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
      </ElevatedCard>
    </Link>
  );
}
