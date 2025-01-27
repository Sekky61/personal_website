import { cn } from "@common/utils/cn";
import Link from "next/link";
import { ElevatedCard } from "./Card";
import MouseOffsetWrapper from "./MouseOffsetTracker";

type ImageCardProps = {
  imageUrl: string | null;
  imageAlt?: string;
  children: React.ReactNode;
  link: string;
  imageMissingSvg?: React.ReactNode;
  className?: string;
};

/**
 * A card component with an image at the top.
 * The image is a link to the provided URL.
 * If no image is provided, the imageMissingSvg will be displayed.
 * The card can be styled with tailwind's group.
 */
export const ImageCard = ({
  imageUrl,
  imageAlt,
  children,
  link,
  imageMissingSvg,
  className,
}: ImageCardProps) => {
  return (
    <Link href={link}>
      <ElevatedCard className={cn("image-card flex flex-col", className)}>
        <MouseOffsetWrapper>
          <div className="w-full h-48 secondary-container rounded-xl overflow-hidden">
            <div className="paralax-image h-full">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={imageAlt}
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : (
                <div className="w-full h-full flex justify-center items-center rounded-xl">
                  {imageMissingSvg}
                </div>
              )}
            </div>
          </div>
        </MouseOffsetWrapper>
        {children}
      </ElevatedCard>
    </Link>
  );
};
