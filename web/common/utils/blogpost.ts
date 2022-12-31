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

type Heading = {
    text: string;
    slug: string;
};

// Utility class for transforming blogpost data
export class Blogpost {
    // The raw data from Sanity.
    data: any;
    // The footnotes in the post.
    footnotes: Footnote[];
    // The post as plain text.
    plainText: string;
    // The headings in the post.
    headings: Heading[];

    constructor(post: any) {
        this.data = post;
        this.footnotes = Blogpost.extractFootnotes(post.content);
        this.plainText = Blogpost.blocksToPlainText(post.content);
        this.headings = Blogpost.getHeadings(post.content);
    }

    // Make a slug from a string.
    static makeSlug(text: string) {
        return text
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }

    // Get all h2 headings from a post.
    static getHeadings(blocks: PortableTextBlock[] = []) {
        // Get each line individually, and filter out anything that
        // isn't a h2 heading.
        return blocks
            // loop through each block
            .filter((block: any) => {
                return block._type == 'block' && block.style == "h2";
            })
            .map((block: any) => {
                const text = this.blocksToPlainText([block]);
                const slug = Blogpost.makeSlug(text);
                return { text, slug };
            })
    }

    // returns array, one item for every section.
    static extractFootnotes(blocks: PortableTextBlock[] = []): Footnote[] {
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
    }

    // Source: https://www.sanity.io/docs/presenting-block-text
    static blocksToPlainText(blocks: PortableTextBlock[] = []) {
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
    }

    // Works on different format than `blocksToPlainText`
    static childrenToPlainText(children: any[] = []) {
        return children.map((child: any) => {
            if (typeof (child) == "string") {
                return child;
            } else {
                // Object
                return child.props.text;
            }
        }).join('')
    }
}

// Utility class for loading blogpost data from Sanity.
export class BlogpostLoader {
    // Get all posts, paginated.
    static async getPaginatedPosts(from: number, to: number): Promise<Blogpost[]> {
        let posts = await getClient().fetch(groq`${ALL_PUBLISHED_POSTS} | order(_createdAt desc) [$from...$to]{
            ...,
            "series": *[_type == "series" && references(^._id)]
          }`, { from, to });

        return posts.map((post: any) => new Blogpost(post));
    }

    // Get all slugs for posts.
    static async getAllSlugs(): Promise<string[]> {
        return await getClient().fetch(groq`${ALL_PUBLISHED_POSTS}.slug.current`);
    }

    // Get a single post by slug.
    static async getPostBySlug(slug: string): Promise<Blogpost> {
        let post = await getClient().fetch(groq`
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
        return new Blogpost(post);
    }

    // Get all series.
    static async getPostSeries() {
        return getClient().fetch(groq`*[_type == "series"]{
            ...,
            posts[]->
        }`);
        // TODO sort by date and make class for series
    }

    // Get the number of posts.
    static async getPostsCount() {
        return await getClient().fetch(groq`count(${ALL_PUBLISHED_POSTS})`);
    }
}
