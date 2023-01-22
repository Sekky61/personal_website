import { BlogpostDataLoader } from "@common/utils/blogpost"

// Revalidates all blog posts
// Source: https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration#using-on-demand-revalidation
export default async function handler(req: any, res: any) {
    // Check for secret to confirm this is a valid request
    if (req.query.secret !== process.env.REVALIDATION_SECRET) {
        return res.status(401).json({ message: 'Invalid token' })
    }

    const blog_slugs = await BlogpostDataLoader.getAllSlugs();

    const blog_paths = blog_slugs.map((slug: string) => {
        return `/blog/${slug}`
    });

    try {
        // this should be the actual path not a rewritten path
        // e.g. for "/blog/[slug]" this should be "/blog/post-1"
        for (const path of blog_paths) {
            await res.revalidate(path)
        }
        return res.json({ revalidated: true })
    } catch (err) {
        // If there was an error, Next.js will continue
        // to show the last successfully generated page
        return res.status(500).send('Error revalidating')
    }
}