import { loadContent } from "@common/mdxLoader";
import { mdxComponents } from "@common/utils/blockRendering";
import type { NextPage } from "next";

export const metadata = {
  title: "About",
};

export const dynamic = "force-static";

const About: NextPage = async () => {
  const Content = await loadContent("about_me");
  console.log(Content);
  return (
    <>
      <h1 className="heading-primary">About me</h1>
      <Content components={mdxComponents} />
    </>
  );
};

export default About;
