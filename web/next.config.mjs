import createMDX from "@next/mdx";
import withToc from "@stefanprobst/rehype-extract-toc";
import withTocExport from "@stefanprobst/rehype-extract-toc/mdx";
import recmaExportFilepath from "recma-export-filepath";
import rehypeKatex from "rehype-katex";
import rehypeUnwrapImages from "rehype-unwrap-images";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import myRemarkSectionize from "./common/remark-sections.mjs";
import remarkMath from 'remark-math';

const STUDIO_REWRITE = {
  source: "/admin/:path*",
  destination:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3333/admin/:path*"
      : "/admin/index.html",
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  options: {
    remarkPlugins: [
      remarkFrontmatter,
      remarkMdxFrontmatter,
      myRemarkSectionize,
      remarkMath,
    ],
    rehypePlugins: [withToc, withTocExport, rehypeUnwrapImages, rehypeKatex],
    recmaPlugins: [recmaExportFilepath],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  swcMinify: true,
  rewrites: async () => [STUDIO_REWRITE],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },
};

export default withMDX(nextConfig);
