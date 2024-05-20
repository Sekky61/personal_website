import Image from "next/image";

const CustomImage = ({ value }: any) => {
  const { caption, alt, url } = value;

  return (
    <div className="flex justify-center">
      <figure className="rounded-md overflow-hidden">
        <Image src={url} alt={alt} width={450} height={450} className="mx-auto" />
        <figcaption className="text-center mt-1">{caption}</figcaption>
      </figure>
    </div>
  );
};

export default CustomImage;
