import "katex/dist/katex.min.css";
import { BlockMath, InlineMath } from "react-katex";

export const LatexBlock = ({ value }: any) => {
  return <BlockMath>{value.body}</BlockMath>;
};

export const LatexInline = ({ value }: any) => {
  return <InlineMath>{value.body}</InlineMath>;
};
