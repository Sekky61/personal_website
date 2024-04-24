import { Catchphrase } from "@common/components/Catchphrase";
import { ImageCard } from "@common/components/ImageCard";
import type * as Schema from "@common/sanityTypes";
import { getBeginningOfArticle } from "@common/utils/blogpost";
import { formatDate } from "@common/utils/misc";
import { getPaginatedPosts } from "@common/utils/sanity/dataLoaders";
import type { NextPage } from "next";
import Image from "next/image";

export const metadata = {
  title: "Majer",
};

export const dynamic = "force-static";

const Home: NextPage = async () => {
  const postsData = await getPaginatedPosts(0, 2);
  const postCards = postsData.map((postData) => {
    return (
      <li key={postData._id}>
        <PostCard postData={postData} />
      </li>
    );
  });

  return (
    <>
      <div className="flex flex-col-reverse justify-stretch items-stretch md:flex-row mb-12 ">
        <div>
          <div className="text-5xl text-nowrap p-4 primary-cont rounded-b-xl md:rounded-xl md:rounded-r-none font-semibold">
            Hi, I'm Michal.
          </div>
          <Catchphrase />
        </div>
        <div className="rounded-t-3xl md:rounded-3xl md:rounded-tl-none p-4 primary-cont w-full flex justify-center items-center">
          <Image
            src="/img/myFace.png"
            width={500}
            height={500}
            className="rounded-lg"
            alt="My face"
            priority
          />
        </div>
      </div>
      <div className="latest-posts">
        <h2 className="heading-primary text-4xl font-semibold mb-5">
          Latest posts
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">{postCards}</ul>
      </div>
    </>
  );
};

const PostCard = ({ postData }: { postData: Schema.PostWithSeries }) => {
  // format date
  const date = new Date(postData.releaseDate);
  const formattedDate = formatDate(date);
  const text = getBeginningOfArticle(postData, 240);

  return (
    <ImageCard
      imageUrl={postData.img}
      imageAlt={postData.title}
      link={`/post/${postData.slug.current}`}
      imageMissingSvg={null}
    >
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-xl group-hover:underline">{postData.title}</h3>
        <p className="text-sm three-line-text-ellipsis flex-grow">{text}</p>
      </div>
    </ImageCard>
  );
};

export default Home;
