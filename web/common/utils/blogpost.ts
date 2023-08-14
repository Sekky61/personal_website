import { PortableTextBlock } from "@portabletext/types";
import { groq } from "next-sanity";
import readingTime, { ReadTimeResults } from "reading-time";

import { getClient } from "./sanity/sanity.server";
import type * as Schema from "../sanityTypes";

const ALL_POSTS = `*[_type == "post"]`;
const ALL_PUBLISHED_POSTS = `*[_type == "post" && published]`;
const POST_BY_SLUG = `*[_type == "post" && slug.current == $slug][0]`; // Parameter slug

export type Footnote = {
    text: string;
    number: number;
};

export type Heading = {
    text: string;
    slug: string;
};

export type Source = {
    name: string;
    link: string;
};

export function getBeginningOfArticle(post: Schema.Post, length: number = 100) {
    const text = blocksToPlainText(post.content);
    return text.slice(0, length);
}

export function getFootnotes(post: Schema.Post): Footnote[] {
    const blocks = post.content;
    let arr: Footnote[] = [];
    let counter = 1;
    blocks
        .filter((block: any) => {
            return block._type == 'block';
        })
        .forEach((block: any) => {
            const isHeading = block.style == "heading";
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

export function getHeadings(post: Schema.Post): Heading[] {
    const blocks = post.content;
    // Get each line individually, and filter out anything that isn't a heading.
    return blocks
        // loop through each block
        .filter((block: PortableTextBlock) => {
            return block._type == 'block' && block.style == "heading";
        })
        .map((block: PortableTextBlock) => {
            const text = blocksToPlainText([block]);
            const slug = makeSlug(text);
            return { text, slug };
        })
}

export function blocksToPlainText(blocks: PortableTextBlock[] = []) {
    return blocks
        // loop through each block
        .map((block: PortableTextBlock) => {
            // if it's not a text block with children, 
            // return nothing
            if (block._type !== 'block' || !block.children) {
                return ''
            }
            // loop through the children spans, and join the
            // text strings
            return block.children.map((child: any) => {
                // if it's a footnote, do not render
                if (child._type == 'footnote') {
                    return '';
                }
                return child.text;
            }).join('')
        })
        // join the paragraphs leaving split by two linebreaks
        .join('\n\n')
}


export function postReadingTime(post: Schema.Post): ReadTimeResults {
    const text = blocksToPlainText(post.content);
    return readingTime(text);
}

export function isPartOfSeries(post: PostWithSeries) {
    return post.series && post.series.length > 0;
}

export function getSeriesPart(post: PostWithSeries) {
    if (!isPartOfSeries(post)) {
        return null;
    }

    if (post.series.length < 1) {
        throw new Error("Post is part of series, but series is empty.");
    }

    return post.series[0].posts!.findIndex((el: any) => {
        return el._ref == post._id;
    }) + 1;
}

export function getSerieSlug(post: PostWithSeries) {
    if (isPartOfSeries(post)) {
        return post.series[0].slug.current;
    }
    return null;
}

// Make a slug from a string.
export function makeSlug(text: string) {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

// Works on different format than `blocksToPlainText`
export function childrenToPlainText(children: any[] = []) {
    return children.map((child: any) => {
        if (typeof (child) == "string") {
            return child;
        } else {
            // Object
            return child.props.text;
        }
    }).join('')
}

export class BlogpostSeries {
    data: any; // TODO: Type this when it is more stable.

    constructor(seriesObj: any) {
        this.data = seriesObj;
    }

    get slug() {
        return this.data.slug.current;
    }

    get title() {
        return this.data.title;
    }

    get posts() {
        return this.data.posts;
    }

    get tags() {
        return this.data.tags;
    }
}

export interface PostWithSeries extends Schema.Post {
    series: Schema.Series[];
}

export type SeriesWithPosts = Omit<Schema.Series, "posts"> & { posts: PostWithSeries[] };

// Utility class for loading blogpost data from Sanity.
export class BlogpostDataLoader {
    // Get all posts, paginated.
    static async getPaginatedPosts(from: number, to: number) {
        let posts: PostWithSeries[] = await getClient().fetch(groq`${ALL_PUBLISHED_POSTS} | order(releaseDate desc) [$from...$to]{
            ...,
            "series": *[_type == "series" && references(^._id)]
          }`, { from, to });

        return posts;
    }

    // Get all slugs for posts.
    static async getAllSlugs(): Promise<string[]> {
        return await getClient().fetch(groq`${ALL_PUBLISHED_POSTS}.slug.current`);
    }

    // Get a single post by slug.
    // TODO: type does not express the image and markDefs
    static async getPostBySlug(slug: string) {
        let post = await getClient().fetch<PostWithSeries>(groq`
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
        return post;
    }

    // Get all series.
    static async getPostSeries() {
        return getClient().fetch<SeriesWithPosts[]>(groq`*[_type == "series"]{
            ...,
            posts[]->
        }`);
        // TODO sort by date and make class for series
    }

    // Get the number of posts.
    static async getPostsCount(): Promise<number> {
        return await getClient().fetch(groq`count(${ALL_PUBLISHED_POSTS})`);
    }
}

// Data I want to load from GitHub API
export interface GitHubData {
    name: string;
    description: string;
    updated_at: string;
    language: string;
}

// Data I want to load from Sanity
export interface RepositoryWithGithubData extends Schema.Repository {
    githubData: GitHubData;
}

export interface LoadedPortfolio {
    text: Schema.PortableText;
    projects: Array<RepositoryWithGithubData>;
}

export class RepositoriesLoader {
    static async getPortfolio(): Promise<LoadedPortfolio> {
        // Get data from Sanity and join references to repositories
        const data: LoadedPortfolio = await getClient().fetch(groq`*[_type == "portfolio"][0]{...,projects[]->}`);

        // Get github data for each repo
        const repos = data.projects.map(async (repo: Schema.Repository) => {
            const githubData = await this.getGithubData(repo.link);
            return { ...repo, githubData };
        });

        // Wait for all promises to resolve
        data.projects = await Promise.all(repos);

        return data;
    }

    // Link: a github.com link to a repository
    // Returns only selected keys from the GitHub API response
    static async getGithubData(repoUrl: string): Promise<GitHubData> {
        if (!repoUrl.includes('github.com')) {
            throw new Error(`Invalid GitHub URL: ${repoUrl}`);
        }

        const repoApiUrl = repoUrl.replace('github.com', 'api.github.com/repos');
        const response = await fetch(repoApiUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch repository data from GitHub API: ${response.status} ${response.statusText}`);
        }
        const repoData = await response.json() as GitHubData;

        // Select some keys from the response
        const { name, description, updated_at, language } = repoData;
        const data = { name, description, updated_at, language };
        return data;
    }
}
