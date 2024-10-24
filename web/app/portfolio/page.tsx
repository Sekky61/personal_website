import { RepoCard } from "@common/components/RepoCard";
import portfolio from "@content/reposit.json";
import { PortableText } from "@portabletext/react";
import type { NextPage } from "next";

export const metadata = {
  title: "Portfolio",
};

export const dynamic = "force-static";

const Portfolio: NextPage = async () => {
  // const portfolio = await getPortfolio();
  // console.log(JSON.stringify(portfolio, null, 2));
  // const { projects, text } = portfolio;
  const projects = portfolio;
  return (
    <>
      <h1 className="heading-primary">My portfolio</h1>
      <p>Here are some of the projects I have worked on.</p>
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
