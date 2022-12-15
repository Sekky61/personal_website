import { getClient } from "@common/utils/sanity/sanity.server";
import { GetStaticProps } from "next";
import { groq } from "next-sanity";
import BlogListing, { resultsPerPage } from "./[page]";

export default function FirstPage({ posts_props, posts_count }: any) {
    return (
        <BlogListing posts_props={posts_props} posts_count={posts_count} page={1}></BlogListing>
    );
}

export const getStaticProps: GetStaticProps = async (context) => {
    const page = 1;

    const from = (page - 1) * resultsPerPage;
    const to = from + resultsPerPage;

    const posts = await getClient().fetch(groq`*[_type == "post"] | order(_createdAt desc) [$from...$to]{
        ...,
        "series": *[_type == "series" && references(^._id)]
      }`, { from, to });
    const posts_count = await getClient().fetch(groq`count(*[_type == "post"])`);

    const posts_props = posts.map((post: any) => ({
        title: post.title,
        slug: post.slug.current,
        tags: post.tags
    }));

    return {
        props: { posts_props, posts_count },
        revalidate: 3600,
    };
}