import { LatexBlock, LatexInline } from "@common/components/post/LatexBlock";
import CustomImage from "@common/components/post/customImage";
import Edit from "@common/components/post/edit";
import Table from "@common/components/post/table";
import Tip from "@common/components/post/tip";
import CodeSample from "@components/post/CodeSample";
import LinkHeading from "@components/post/LinkHeading";
import Link from "next/link";
import ArticleSection from "./components/post/ArticleSection";

export const mdxComponents = {
  h2: LinkHeading,
  a: ({ href, children }: any) => {
    return (
      <Link href={href} target="_blank" rel="noreferrer" className="link">
        {children}
      </Link>
    );
  },
  section: ArticleSection,
  pre: ({ children }: any) => {
    // todo temporary
    return (
      <div className="bg-gray-800 rounded-md p-4 text-gray-50">{children}</div>
    );
  },
  img: CustomImage,
  CodeSample,
  LatexInline,
  LatexBlock,
  CustomImage,
  Table,
  Tip,
  Edit,
};
