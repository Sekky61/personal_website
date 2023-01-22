import { BlogpostDataLoader } from "@common/utils/blogpost"
import { createHmac } from "crypto";
import type { NextApiRequest, NextApiResponse } from 'next';

// Revalidates all blog posts, including blog index
// Source: https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration#using-on-demand-revalidation
export default async function handleWebhook(req: NextApiRequest, res: NextApiResponse) {

    const body = req.body;
    if (!body) {
        res.status(400).send('Bad request (no body)');
        return;
    }

    console.log(`Body: ${body}`);
    console.log(`Type of body: ${typeof body}`);

    // compute our signature from the raw body
    const secret = process.env.REVALIDATION_SECRET;

    if (!secret) {
        res.status(500).send('Secret not set');
        return;
    }

    const signature = req.headers['x-hub-signature-256'];
    const computedSignature =
        'sha256=' + createHmac('sha256', secret).update(body).digest('hex');

    if (computedSignature !== signature) {
        console.log(`Verification failed`);
        res.status(401).send('Unauthorized');
        return;
    }

    console.log(`Verified webhook signature: ${signature}`);

    const blog_slugs = await BlogpostDataLoader.getAllSlugs();

    let blog_paths = blog_slugs.map((slug: string) => {
        return `/post/${slug}`;
    });

    // get number of pages in /blog 
    // todo this is a hack
    const num_pages = Math.ceil(blog_slugs.length / 10);
    // add paths for each page
    for (let i = 0; i < num_pages; i++) {
        blog_paths.push(`/blog/${i + 1}`)
    }

    blog_paths.push('/blog');

    try {
        // this should be the actual path not a rewritten path
        // e.g. for "/blog/[slug]" this should be "/blog/post-1"
        let promises = [];
        for (const path of blog_paths) {
            console.log(`Revalidating ${path} ...`);
            promises.push(res.revalidate(path));
        }
        await Promise.allSettled(promises);
        return res.json({ revalidated: true });
    } catch (err) {
        // If there was an error, Next.js will continue
        // to show the last successfully generated page
        return res.status(500).send('Error revalidating');
    }
}