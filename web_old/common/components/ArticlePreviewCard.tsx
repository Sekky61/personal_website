import type { ArticleMetadata } from "@common/mdxLoader";
import { formatDate, postUrl } from "@common/utils/misc";
import { Link } from "next-view-transitions";
import Image from "next/image";
import { ElevatedCard } from "./Card";
import { Pills } from "./Pill";

interface BlogPostCardProps {
  post: ArticleMetadata;
}

/** One item in a list of articles */
export function ArticlePreviewCard({ post }: BlogPostCardProps) {
  const date = post.releaseDate;
  const formattedDate = formatDate(date);

  // The image rounding of 12px is copied from stylesheet
  return (
    <Link href={postUrl(post)}>
      <ElevatedCard className="flex flex-col md:flex-row group md:h-48">
        {post.titleImage && (
          <div
            className="bg-surface-container-high h-30 md:h-full w-full md:w-[200px] relative shrink-0 overflow-hidden aspect-square rounded-t-medium md:rounded-r-none md:rounded-l-medium"
            style={{ viewTransitionName: `transition-${post.slug}` }}
          >
            <Image
              fill
              src={post.titleImage}
              className="object-cover object-center"
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
