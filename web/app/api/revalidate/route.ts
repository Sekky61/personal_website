import { sanityCacheTag } from "@common/static";

import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

// Source: https://victoreke.com/blog/sanity-webhooks-and-on-demand-revalidation-in-nextjs
export async function POST(req: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody<{
      _type: string;
      slug?: string | undefined;
    }>(req, process.env.NEXT_PUBLIC_SANITY_HOOK_SECRET);

    if (!isValidSignature) {
      return new Response("Invalid Signature", { status: 401 });
    }

    if (!body?._type) {
      return new Response("Bad Request", { status: 400 });
    }

    // const blogPaths = [`/post/${body._type}`, "/blog", "/series", "/"];
    //
    // const blogSlugs = await getAllSlugs();
    //
    // // get number of pages in /blog, add path for each page
    // const numPages = Math.ceil(blogSlugs.length / resultsPerPage);
    // for (let i = 0; i < numPages; i++) {
    // 	blogPaths.push(`/blog/${i + 1}`);
    // }
    //
    // for (let tag of blogPaths) {
    // 	revalidateTag(tag);
    // }

    revalidateTag(sanityCacheTag);
    return NextResponse.json({
      status: 200,
      revalidated: true,
      now: Date.now(),
      body,
    });
  } catch (error: any) {
    console.error(error);
    return new Response(error.message, { status: 500 });
  }
}
