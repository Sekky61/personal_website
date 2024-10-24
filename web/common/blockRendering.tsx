import { LatexBlock, LatexInline } from "@common/components/post/LatexBlock";
import CustomImage from "@common/components/post/customImage";
import Edit from "@common/components/post/edit";
import Table from "@common/components/post/table";
import Tip from "@common/components/post/tip";
import CodeSample from "@components/post/CodeSample";
import LinkHeading from "@components/post/LinkHeading";
import Link from "next/link";

export const mdxComponents = {
  h2: LinkHeading,
  a: ({ href, children }) => {
    return (
      <Link href={href} target="_blank" rel="noreferrer" className="link">
        {children}
      </Link>
    );
  },
  CodeSample,
  LatexInline,
  LatexBlock,
  CustomImage,
  Table,
  Tip,
  Edit,
};
