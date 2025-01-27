import { ArticlePreviewCard } from "@common/components/ArticlePreviewCard";
import { ElevatedCard } from "@common/components/Card";
import { Catchphrase } from "@common/components/Catchphrase";
import {
  type ArticleMetadata,
  allPublishedArticles,
} from "@common/mdxLoader";
import { formatDate, postUrl } from "@common/utils/misc";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  description: "Michal Majer's personal blog",
};

export const dynamic = "force-static";

const Home: NextPage = async () => {
  const postsData = await allPublishedArticles();
  const postCards = postsData.slice(0, 2).map((postData) => {
    return (
      <li key={postData.slug}>
        <ArticlePreviewCard post={postData} />
      </li>
    );
  });

  return (
    <>
      <div className="flex flex-col-reverse justify-stretch items-stretch md:flex-row mb-12">
        <div>
          <div className="text-5xl text-nowrap p-4 primary-container rounded-b-xl md:rounded-xl md:rounded-r-none font-semibold">
            Hi, I&apos;m Michal.
          </div>
          <Catchphrase />
        </div>
        <div className="rounded-t-3xl md:rounded-3xl md:rounded-tl-none p-4 primary-container w-full flex justify-center items-center">
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
        <h2 className="display-medium font-semibold mb-5">
          Latest posts
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">{postCards}</ul>
      </div>
    </>
  );
};

export default Home;
