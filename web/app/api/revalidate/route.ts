import { sanityCacheTag } from "@common/static";

import { parseBody } from "next-sanity/webhook";
import { revalidatePath, revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

// Source: https://victoreke.com/blog/sanity-webhooks-and-on-demand-revalidation-in-nextjs
export async function POST(req: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody<{
      _type: string;
      slug?: string | undefined;
    }>(req, process.env.REVALIDATION_SECRET);

    if (!isValidSignature) {
      return new Response("Invalid Signature", { status: 401 });
    }

    if (!body?._type) {
      return new Response("Bad Request", { status: 400 });
    }

    // Revalidate all
    revalidatePath("/", "layout");
    revalidateTag(sanityCacheTag);
    return NextResponse.json({
      status: 200,
      revalidated: true,
      now: Date.now(),
    });
  } catch (error: any) {
    console.error(error);
    return new Response(error.message, { status: 500 });
  }
}
