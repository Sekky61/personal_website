import { groq } from "next-sanity";
import { getClient } from "./sanity/sanity.server";

const MD_LINE_STARTS_WITH_H2_REGEX = /^##\s/;

export default {
    getPaginatedPosts: async function (from: number, to: number) {
        return getClient().fetch(groq`*[_type == "post"] | order(_createdAt desc) [$from...$to]{
            ...,
            "series": *[_type == "series" && references(^._id)]
          }`, { from, to });
    },

    getPostBySlug: async function (slug: string) {
        return getClient().fetch(groq`*[_type == "post" && slug.current == $slug][0]{
            ...,
            "series": *[_type == "series" && references(^._id)]
          }`, { slug });
    },

    getPostsCount: async function () {
        return getClient().fetch(groq`count(*[_type == "post"])`);
    },

    makeSlug: function (text: string) {
        return text
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    },

    getH2Headings: function (source: string) {
        // Get each line individually, and filter out anything that
        // isn't a h2 heading.
        const headingLines = source.split("\n").filter((line) => {
            return line.match(MD_LINE_STARTS_WITH_H2_REGEX);
        });
        return headingLines.map((raw) => {
            const text = raw.replace(/^##\s/, "");

            const slug = this.makeSlug(text);

            return { text, slug };
        });
    }
};
