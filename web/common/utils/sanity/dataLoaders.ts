"use server";
import type * as Schema from "@common/sanityTypes";
import { sanityCacheTag } from "@common/static";
import { groq } from "next-sanity";
import { revalidateTag } from "next/cache";
import { getClient } from "./sanity.server";

// Partial queries
const ALL_POSTS = `*[_type == "post"]`;
const ALL_PUBLISHED_POSTS = `*[_type == "post" && published]`;
const POST_BY_SLUG = `*[_type == "post" && slug.current == $slug][0]`; // Parameter slug

/**
 * Fetch a list of posts
 * @param from - The index of the first post to fetch
 * @param to - The index of the last post to fetch
 * @returns A list of posts, sorted by release date, from newest to oldest
 */
export async function getPaginatedPosts(from: number, to: number) {
  revalidateTag(sanityCacheTag);
  return getClient().fetch<Schema.PostWithSeries[]>(
    groq`${ALL_PUBLISHED_POSTS} | order(releaseDate desc) [$from...$to]{
            ...,
            "series": *[_type == "series" && references(^._id)]
          }`,
    { from, to },
  );
}

/**
 * @returns All slugs for all posts.
 */
export async function getAllSlugs() {
  revalidateTag(sanityCacheTag);
  return getClient().fetch<string[]>(groq`${ALL_PUBLISHED_POSTS}.slug.current`);
}

/**
 * Get a single post by slug.
 *
 * TODO: type does not express the image and markDefs
 * @param slug - The slug of the post to fetch.
 * @returns A single post.
 */
export async function getPostBySlug(slug: string) {
  revalidateTag(sanityCacheTag);
  return getClient().fetch<Schema.PostWithSeries>(
    groq`
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
        }`,
    { slug },
  );
}

/**
 * @returns A list of all series, with their posts.
 */
export async function getPostSeries() {
  revalidateTag(sanityCacheTag);
  return getClient().fetch<Schema.SeriesWithPosts[]>(groq`*[_type == "series"]{
            ...,
            posts[]->
        }`);
  // TODO sort by date and make class for series
}

/**
 * @returns The total number of posts.
 */
export async function getPostsCount() {
  revalidateTag(sanityCacheTag);
  return getClient().fetch<number>(groq`count(${ALL_PUBLISHED_POSTS})`);
}

/**
 * @returns The portfolio data, with featured projects and github data for each project.
 */
export async function getPortfolio(): Promise<Schema.LoadedPortfolio> {
  revalidateTag(sanityCacheTag);
  // Get data from Sanity and join references to repositories
  return getClient()
    .fetch<Schema.PortfolioWithProjects>(
      groq`*[_type == "portfolio"][0]{...,projects[]->}`,
    )
    .then(async (data: Schema.PortfolioWithProjects) => {
      // Get github data for each repo
      const repos = data.projects.map(async (repo: Schema.Repository) => {
        const githubData = await getGithubData(repo.link);
        return { ...repo, githubData };
      });

      // Wait for all promises to resolve
      // TODO: maybe replace `all`, but what to do if any promise rejects?
      const x: Schema.LoadedPortfolio = {
        ...data,
        projects: await Promise.all(repos),
      };

      return x;
    });
}

function isGitHubData(data: any): data is Schema.GitHubData {
  revalidateTag(sanityCacheTag);
  if (typeof data !== "object") return false;
  const hasName = typeof data.name === "string";
  const hasUpdatedAt = typeof data.updated_at === "string";
  const hasLanguage = typeof data.language === "string";
  return hasName && hasUpdatedAt && hasLanguage;
}

/**
 * Fetches data from the GitHub API
 * @param repoUrl - A github.com link to a repository
 * @returns Basic information about the repository
 */
export async function getGithubData(
  repoUrl: string,
): Promise<Schema.GitHubData> {
  revalidateTag(sanityCacheTag);
  if (!repoUrl.includes("github.com")) {
    throw new Error(
      `Invalid GitHub URL: ${repoUrl} - provide a github.com URL`,
    );
  }
  const repoApiUrl = repoUrl.replace("github.com", "api.github.com/repos");

  return fetch(repoApiUrl)
    .then((res) => res.json())
    .then((json) => {
      if (!isGitHubData(json)) {
        throw new Error(`Invalid GitHub data: ${JSON.stringify(json)}`);
      }

      // Select some keys from the response
      const { name, description, updated_at, language } = json;
      const data: Schema.GitHubData = {
        name,
        description,
        updated_at,
        language,
      };
      return data;
    })
    .catch((err: Error) => {
      err.name = `GitHub API error: ${err.name}`;
      throw err;
    });
}
