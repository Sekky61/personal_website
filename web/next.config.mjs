import createMDX from "@next/mdx";
import withToc from "@stefanprobst/rehype-extract-toc";
import withTocExport from "@stefanprobst/rehype-extract-toc/mdx";
import recmaExportFilepath from "recma-export-filepath";
import rehypeKatex from "rehype-katex";
import rehypeMdxCodeProps from "rehype-mdx-code-props";
import rehypeUnwrapImages from "rehype-unwrap-images";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import myRemarkSectionize from "./common/remark-sections.mjs";

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  options: {
    remarkPlugins: [
      remarkFrontmatter,
      remarkMdxFrontmatter,
      myRemarkSectionize,
      remarkMath,
      remarkGfm,
    ],
    rehypePlugins: [
      withToc,
      withTocExport,
      rehypeUnwrapImages,
      rehypeKatex,
      rehypeMdxCodeProps,
    ],
    recmaPlugins: [recmaExportFilepath],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

export default withMDX(nextConfig);
