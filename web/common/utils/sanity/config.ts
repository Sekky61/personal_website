export const config = {
  /**
   * Find your project ID and dataset in `sanity.json` in your studio project.
   * These are considered “public”, but you can use environment variables
   * if you want differ between local dev and production.
   *
   * https://nextjs.org/docs/basic-features/environment-variables
   **/
  dataset: chooseDataset(),
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  apiVersion: "2022-08-21", // Learn more: https://www.sanity.io/docs/api-versioning
  /**
   * Set useCdn to `false` if your application require the freshest possible
   * data always (potentially slightly slower and a bit more expensive).
   * Authenticated request (like preview) will always bypass the CDN
   **/
  useCdn: process.env.NODE_ENV === "production",
  token: process.env.SANITY_API_TOKEN,
};

/**
 * Choose between the production and development dataset.
 * Pick based on the NODE_ENV, but override if SANITY_DATASET is set.
 */
function chooseDataset() {
  if (process.env.SANITY_DATASET) {
    return process.env.SANITY_DATASET;
  }

  if (process.env.NODE_ENV === "production") {
    return process.env.NEXT_PUBLIC_SANITY_DATASET;
  }

  return process.env.DEV_DATASET || "production";
}
