import { BlogpostDataLoader } from "@common/utils/blogpost"
import type { NextApiRequest, NextApiResponse } from 'next';
import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook'

// Revalidates all blog posts, including blog index
// Body should contain Sanity document that had changes
// Source: https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration#using-on-demand-revalidation
export default async function handleWebhook(req: NextApiRequest, res: NextApiResponse) {

    const body = req.body;
    if (!body) {
        res.status(400).send('Bad request (no body)');
        return;
    }

    console.dir(body);
    console.dir(req.headers);

    const stringBody = JSON.stringify(body);

    // compute our signature from the raw body
    const secret = process.env.REVALIDATION_SECRET;

    if (!secret) {
        res.status(500).send('Secret not set');
        return;
    }

    const signature = req.headers[SIGNATURE_HEADER_NAME];

    if (!(typeof signature === 'string')) {
        res.status(401).json({ success: false, message: 'Missing or malformed signature' });
        return;
    }

    if (!isValidSignature(stringBody, signature, secret)) {
        res.status(401).json({ success: false, message: 'Invalid signature' });
        return;
    }

    console.log(`Verified webhook signature: ${signature}`);

    const blog_slugs = await BlogpostDataLoader.getAllSlugs();

    const slug = body.slug?.current;

    if (!slug) {
        res.status(400).send('Bad request (no slug)');
        return;
    }

    let blog_paths = [`/post/${body.slug.current}`];

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