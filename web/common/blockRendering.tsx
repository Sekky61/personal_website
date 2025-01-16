import { LatexBlock, LatexInline } from "@common/components/post/LatexBlock";
import CustomImage from "@common/components/post/customImage";
import Edit from "@common/components/post/edit";
import Table from "@common/components/post/table";
import Tip from "@common/components/post/tip";
import {Code} from "@components/post/CodeSample";
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
  pre: (p: any) => {
    // This supports the markdown
    //
    // ```lang propname={propvalue} ...
    // code
    // ```
    // syntax.
    const codeTag = p.children;
    if (codeTag === undefined) {
      throw new Error("Code block is empty");
    }

    const language =
      codeTag.props.className?.replace("language-", "") || "text";
    const code = codeTag.props.children;
    return (
      <Code language={language} {...p}>
        {code}
      </Code>
    );
  },
  section: ArticleSection,
  img: CustomImage,
  Code, // Manual option
  LatexInline,
  LatexBlock,
  CustomImage,
  Table,
  Tip,
  Edit,
};
