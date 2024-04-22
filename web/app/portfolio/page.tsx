import { RepoCard } from "@common/components/RepoCard";
import { blockRenderingElements } from "@common/utils/blockRendering";
import { getPortfolio } from "@common/utils/sanity/dataLoaders";
import { PortableText } from "@portabletext/react";
import type { NextPage } from "next";

export const metadata = {
  title: "Majer - Portfolio",
};

export const dynamic = "force-static";

const Portfolio: NextPage = async () => {
  const portfolio = await getPortfolio();
  const { projects, text } = portfolio;
  return (
    <>
      <h1 className="heading-primary">My portfolio</h1>
      <PortableText value={text} components={blockRenderingElements} />
      <h2 className="metablock-heading">Highlighted Repositories</h2>
      <div className="grid grid-cols-2 gap-4">
        {projects.map((repo) => {
          return <RepoCard repo={repo} key={repo.name} />;
        })}
      </div>
    </>
  );
};

export default Portfolio;
