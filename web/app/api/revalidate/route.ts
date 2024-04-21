
import type { NextApiRequest, NextApiResponse } from "next";
import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";
import { getAllSlugs } from "@common/utils/sanity/dataLoaders";
import { resultsPerPage } from "@common/static";

// Revalidates all blog posts, including blog index
// Source: https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration#using-on-demand-revalidation
export default async function handleWebhook(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	// Body should contain Sanity document that had changes
	const body = req.body;
	if (!body) {
		res.status(400).send("Bad request (no body)");
		return;
	}

	const stringBody = JSON.stringify(body);

	// Validation

	const secret = process.env.REVALIDATION_SECRET;
	const signature = req.headers[SIGNATURE_HEADER_NAME];
	if (!secret) {
		res.status(500).send("Secret not set");
		return;
	}
	if (!(typeof signature === "string")) {
		res
			.status(401)
			.json({ success: false, message: "Missing or malformed signature" });
		return;
	}
	if (!isValidSignature(stringBody, signature, secret)) {
		res.status(401).json({ success: false, message: "Invalid signature" });
		return;
	}

	console.info(`Verified webhook signature`);

	// Get paths to revalidate

	const slug = body.slug?.current;
	if (!slug) {
		res.status(400).send("Bad request (no slug)");
		return;
	}
	let blogPaths = [`/post/${body.slug.current}`, "/blog", "/series", "/"];

	const blogSlugs = await getAllSlugs();

	// get number of pages in /blog, add path for each page
	const numPages = Math.ceil(blogSlugs.length / resultsPerPage);
	for (let i = 0; i < numPages; i++) {
		blogPaths.push(`/blog/${i + 1}`);
	}

	try {
		// this should be the actual path not a rewritten path
		// e.g. for "/blog/[slug]" this should be "/blog/post-1"
		let promises = [];
		for (const path of blogPaths) {
			console.info(`Revalidating ${path} ...`);
			promises.push(res.revalidate(path));
		}
		await Promise.allSettled(promises);

		console.info(`Revalidation complete`);
		return res.json({ success: true });
	} catch (err) {
		// If there was an error, Next.js will continue
		// to show the last successfully generated page
		console.info(`Error revalidating`);
		return res
			.status(500)
			.json({ success: false, message: "Error revalidating" });
	}
}

