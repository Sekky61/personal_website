import Link from "next/link";

type ImageCardProps = {
  imageUrl: string | null;
  imageAlt?: string;
  children: React.ReactNode;
  link: string;
  imageMissingSvg?: React.ReactNode;
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
}: ImageCardProps) => {
  return (
    <Link href={link}>
      <div className="card transition duration-150 surface-cont hover:elevation-1 group flex flex-col h-full">
        <div className="w-full h-48 rounded-xl overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={imageAlt}
              className="w-full h-full object-cover rounded-xl"
            />
          ) : (
            <div className="w-full h-full tertiary flex justify-center items-center">
              {imageMissingSvg}
            </div>
          )}
        </div>
        <div className="p-4 flex-grow flex flex-col">{children}</div>
      </div>
    </Link>
  );
};
