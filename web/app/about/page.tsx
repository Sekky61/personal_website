import { mdxComponents } from "@common/blockRendering";
import { loadContent } from "@common/mdxLoader";
import type { NextPage } from "next";

export const metadata = {
  title: "About me",
};

export const dynamic = "force-static";

const About: NextPage = async () => {
  const Content = await loadContent("about_me.mdx");
  return (
    <>
      <h1 className="display-large">About me</h1>
      <Content components={mdxComponents} />
    </>
  );
};

export default About;
