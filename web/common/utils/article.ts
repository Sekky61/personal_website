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
        return getClient().fetch(groq`
        *[_type == "post" && slug.current == $slug][0]{
            ...,
            "series": *[_type == "series" && references(^._id)],
            content[]{
                ...,
                markDefs[]{
                    ...,
                    _type == "internalLink" => {
                        "slug": @.reference->slug
                    }
                },
                _type == "image" => {
                    "url": @.asset->url
                }
            }
        }`, { slug });
    },

    getPostSeries: async function () {
        return getClient().fetch(groq`*[_type == "series"]{
            ...,
            posts[]->
        }`);
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
    },

    // Source: https://www.sanity.io/docs/presenting-block-text
    blocksToPlainText: function (blocks: any[] = []) {
        return blocks
            // loop through each block
            .map((block: any) => {
                // if it's not a text block with children, 
                // return nothing
                if (block._type !== 'block' || !block.children) {
                    return ''
                }
                // loop through the children spans, and join the
                // text strings
                return block.children.map((child: any) => child.text).join('')
            })
            // join the paragraphs leaving split by two linebreaks
            .join('\n\n')
    },

    // Works on different format than `blocksToPlainText`
    childrenToPlainText: function (children: any[] = []) {
        return children.map((child: any) => {
            if (typeof (child) == "string") {
                return child;
            } else {
                // Object
                return child.props.text;
            }
        }).join('')
    }
};
