import type { NextPage } from "next";
import { PortableText } from "@portabletext/react";
import { blockRenderingElements } from "@common/utils/blockRendering";
import RepoCard from "@common/components/RepoCard";
import { getPortfolio } from "@common/utils/sanity/dataLoaders";

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
			<h2 className="metablock-heading">Highlighted repositories</h2>
			<div className="grid grid-cols-3 gap-2">
				{projects.map((repo) => {
					return <RepoCard repo={repo} key={repo.name} />;
				})}
			</div>
		</>
	);
};

export default Portfolio;
