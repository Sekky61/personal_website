import { NextPage } from "next";
import Link from "next/link";

import type * as Schema from "@common/sanityTypes";
import { Pills } from "@common/components/Pill";
import { getPostSeries } from "@common/utils/sanity/dataLoaders";

export const metadata = {
	title: "Majer - Post series",
};

export const dynamic = "force-static";

const SeriesPage: NextPage = async () => {
	const series = await getPostSeries();
	const seriesCards = series.map((series) => (
		<li key={series.slug.current}>
			<SeriesCard series={series}></SeriesCard>
		</li>
	));

	return (
		<>
			<h1 className="heading-primary">The Blog</h1>
			<p className="mb-6">Posts series</p>
			<ul className="flex flex-col divide-y">{seriesCards}</ul>
		</>
	);
};

function SeriesCard({ series }: { series: Schema.SeriesWithPosts }) {
	const postsList = series.posts.map(({ title, _id }: any) => (
		<li key={_id} className="">
			{title}
		</li>
	));

	return (
		<Link href={`/post/${series.slug}`}>
			<div className="group duration-100 w-full p-4 hover:bg-primary-40/[.08]">
				<h2 className="text-2xl mb-2 group-hover:underline decoration-primary-40">
					{series.title}
				</h2>
				<Pills texts={series.tags.map((tag: any) => tag.label)}></Pills>
				<ol className="list-decimal mt-2 pl-4">{postsList}</ol>
			</div>
		</Link>
	);
}

export default SeriesPage;
