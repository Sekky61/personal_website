
import { groq } from "next-sanity";
import { getClient } from "./sanity.server";
import type * as Schema from "@common/sanityTypes";

const ALL_POSTS = `*[_type == "post"]`;
const ALL_PUBLISHED_POSTS = `*[_type == "post" && published]`;
const POST_BY_SLUG = `*[_type == "post" && slug.current == $slug][0]`; // Parameter slug

// Utility class for loading blogpost data from Sanity.
export class BlogpostDataLoader {
    // Get all posts, paginated.
    static async getPaginatedPosts(from: number, to: number) {
        let posts: Schema.PostWithSeries[] = await getClient().fetch(groq`${ALL_PUBLISHED_POSTS} | order(releaseDate desc) [$from...$to]{
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
        let post = await getClient().fetch<Schema.PostWithSeries>(groq`
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
        return getClient().fetch<Schema.SeriesWithPosts[]>(groq`*[_type == "series"]{
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

export class RepositoriesLoader {
    static async getPortfolio(): Promise<Schema.LoadedPortfolio> {
        // Get data from Sanity and join references to repositories
        const data: Schema.LoadedPortfolio = await getClient().fetch(groq`*[_type == "portfolio"][0]{...,projects[]->}`);

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
    static async getGithubData(repoUrl: string): Promise<Schema.GitHubData> {
        if (!repoUrl.includes('github.com')) {
            throw new Error(`Invalid GitHub URL: ${repoUrl}`);
        }

        const repoApiUrl = repoUrl.replace('github.com', 'api.github.com/repos');
        const response = await fetch(repoApiUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch repository data from GitHub API: ${response.status} ${response.statusText}`);
        }
        const repoData = await response.json() as Schema.GitHubData;

        // Select some keys from the response
        const { name, description, updated_at, language } = repoData;
        const data = { name, description, updated_at, language };
        return data;
    }
}
