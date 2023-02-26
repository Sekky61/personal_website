import { PortableTextBlock } from "@portabletext/types";
import { groq } from "next-sanity";
import readingTime, { ReadTimeResults } from "reading-time";

import { getClient } from "./sanity/sanity.server";

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

// Utility class for blogposts.
export class Blogpost {
    // The raw data from Sanity.
    data: any; // TODO: Type this when it is more stable.
    // The footnotes in the post.
    footnotes: Footnote[];
    // The headings in the post.
    headings: Heading[];
    // The post as plain text.
    plainText: string;

    constructor(post: any) {
        this.data = post;
        this.footnotes = Blogpost.getFootnotes(post.content);
        this.headings = Blogpost.getHeadings(post.content);
        this.plainText = Blogpost.blocksToPlainText(post.content);
    }

    get releaseDate() {
        return new Date(this.data.releaseDate);
    }

    get slug() {
        return this.data.slug.current;
    }

    // Returns sources as an array of objects.
    get sources(): Source[] {
        return this.data.sources;
    }

    readingTime(): ReadTimeResults {
        return readingTime(this.plainText);
    }

    isPartOfSeries() {
        return this.data.series && this.data.series.length > 0;
    }

    getSeriesPart() {
        if (this.isPartOfSeries()) {
            return this.data.series[0].posts.findIndex((el: any) => {
                return el._ref == this.data._id;
            }) + 1;
        }
        return null;
    }

    getSerieSlug() {
        if (this.isPartOfSeries()) {
            return this.data.series[0].slug.current;
        }
        return null;
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

    // Get the first few words of the post
    getBeginningOfArticle(length: number = 100) {
        return this.plainText.slice(0, length);
    }

    // Get all headings from a post.
    static getHeadings(blocks: PortableTextBlock[] = []): Heading[] {
        // Get each line individually, and filter out anything that isn't a heading.
        return blocks
            // loop through each block
            .filter((block: PortableTextBlock) => {
                return block._type == 'block' && block.style == "heading";
            })
            .map((block: PortableTextBlock) => {
                const text = this.blocksToPlainText([block]);
                const slug = Blogpost.makeSlug(text);
                return { text, slug };
            })
    }

    // returns array, one item for every section.
    static getFootnotes(blocks: PortableTextBlock[] = []): Footnote[] {
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

    // Source: https://www.sanity.io/docs/presenting-block-text
    static blocksToPlainText(blocks: PortableTextBlock[] = []) {
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

// Utility class for loading blogpost data from Sanity.
export class BlogpostDataLoader {
    // Get all posts, paginated.
    static async getPaginatedPosts(from: number, to: number) {
        let posts = await getClient().fetch(groq`${ALL_PUBLISHED_POSTS} | order(releaseDate desc) [$from...$to]{
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
    static async getPostBySlug(slug: string) {
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
        return post;
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
    static async getPostsCount(): Promise<number> {
        return await getClient().fetch(groq`count(${ALL_PUBLISHED_POSTS})`);
    }
}

// Data I want to load from GitHub API
interface GitHubData {
    name: string;
    description: string;
    updated_at: string;
    language: string;
}

// Data I want to load from Sanity
export interface Repository {
    name: string;
    link: string;
    description: string;
    technologies: string[];
    githubData: GitHubData;
}

export interface Portfolio {
    projects: Repository[];
    text: any;
}

export class RepositoriesLoader {
    static async getPortfolio(): Promise<Portfolio> {
        // Get data from Sanity and join references to repositories
        const data: Portfolio = await getClient().fetch(groq`*[_type == "portfolio"][0]{...,projects[]->}`);

        // Get github data for each repo
        const repos = data.projects.map(async (repo: any) => {
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
