import Image from "next/image";

type CustomImageProps = {
  src: string;
  alt: string;
};

const CustomImage = ({ src, alt }: CustomImageProps) => {
  return (
    <div className="flex justify-center">
      <figure className="rounded-md overflow-hidden">
        <Image
          src={src}
          alt={alt}
          width={450}
          height={450}
          className="mx-auto"
        />
        <figcaption className="text-center mt-1">{alt}</figcaption>
      </figure>
    </div>
  );
};

export default CustomImage;
