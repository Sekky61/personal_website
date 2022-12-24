import { PortableTextBlock } from "@portabletext/types";
import { groq } from "next-sanity";
import { getClient } from "./sanity/sanity.server";

const ALL_POSTS = `*[_type == "post"]`;
const ALL_PUBLISHED_POSTS = `*[_type == "post" && published]`;
const POST_BY_SLUG = `*[_type == "post" && slug.current == $slug][0]`; // Parameter slug

type Footnote = {
    text: string;
    number: number;
};

export default {
    getPaginatedPosts: async function (from: number, to: number) {
        return getClient().fetch(groq`${ALL_PUBLISHED_POSTS} | order(_createdAt desc) [$from...$to]{
            ...,
            "series": *[_type == "series" && references(^._id)]
          }`, { from, to });
    },

    getAllSlugs: async function () {
        return await getClient().fetch(groq`${ALL_PUBLISHED_POSTS}.slug.current`);
    },

    getPostBySlug: async function (slug: string) {
        return getClient().fetch(groq`
        ${POST_BY_SLUG}{
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
        return getClient().fetch(groq`count(${ALL_PUBLISHED_POSTS})`);
    },

    makeSlug: function (text: string) {
        return text
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    },

    getH2Headings: function (blocks: PortableTextBlock[] = []) {
        // Get each line individually, and filter out anything that
        // isn't a h2 heading.
        return blocks
            // loop through each block
            .filter((block: any) => {
                return block._type == 'block' && block.style == "h2";
            })
            .map((block: any) => {
                const text = this.blocksToPlainText([block]);
                const slug = this.makeSlug(text);

                return { text, slug };
            })
    },

    // returns array, one item for every section.
    extractFootnotes: function (blocks: PortableTextBlock[] = []): Footnote[] {
        let arr: Footnote[] = [];
        let counter = 1;
        blocks
            .filter((block: any) => {
                return block._type == 'block';
            })
            .forEach((block: any) => {
                const isHeading = block.style == "h2";
                if (!isHeading) {
                    // Ordinary block
                    block.children.forEach((child: any) => {
                        if (child._type == "footnote") {
                            // cannot get index here
                            const text: string = child.text;
                            arr.push({ text, number: counter });
                            counter += 1;
                        }
                    });

                }
            })
        return arr;
    },

    // Source: https://www.sanity.io/docs/presenting-block-text
    blocksToPlainText: function (blocks: PortableTextBlock[] = []) {
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
