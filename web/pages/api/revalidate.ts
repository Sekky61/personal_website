import { BlogpostDataLoader } from "@common/utils/blogpost"

// Revalidates all blog posts
// Source: https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration#using-on-demand-revalidation
export default async function handler(req: any, res: any) {
    // Check for secret to confirm this is a valid request
    if (req.query.secret !== process.env.REVALIDATION_SECRET) {
        return res.status(401).json({ message: 'Invalid token' })
    }

    // const blog_slugs = await BlogpostDataLoader.getAllSlugs();


    // let blog_paths = blog_slugs.map((slug: string) => {
    //     return `/blog/${slug}`
    // });

    // // get number of pages in /blog 
    // // todo this is a hack
    // const num_pages = Math.ceil(blog_slugs.length / 10);
    // // add paths for each page
    // for (let i = 0; i < num_pages; i++) {
    //     blog_paths.push(`/blog/${i + 1}`)
    // }

    // blog_paths.push('/blog');

    // try {
    //     // this should be the actual path not a rewritten path
    //     // e.g. for "/blog/[slug]" this should be "/blog/post-1"
    //     for (const path of blog_paths) {
    //         console.log(`Revalidating ${path}...`);
    //         await res.revalidate(path)
    //     }
    //     return res.json({ revalidated: true })
    // } catch (err) {
    //     // If there was an error, Next.js will continue
    //     // to show the last successfully generated page
    //     return res.status(500).send('Error revalidating')
    // }

    try {
        // this should be the actual path not a rewritten path
        // e.g. for "/blog/[slug]" this should be "/blog/post-1"
        console.log(`Revalidating /blog/sec...`);
        await res.revalidate('/blog/sec')
        return res.json({ revalidated: true })
    } catch (err) {
        // If there was an error, Next.js will continue
        // to show the last successfully generated page
        return res.status(500).send('Error revalidating')
    }
}