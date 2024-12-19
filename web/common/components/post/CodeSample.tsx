import type React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/cjs/styles/prism"; // css object

import { type Token, getRenderer } from "@common/codeRendering";
import { CopyButton } from "../CopyButton";

interface CodeProps {
  /**
   * The code to display
   */
  children?: string;
  language: string;
  fileName?: string;
  lineStart?: number;
  highlights?: Token[];
  output?: string;
}

const lineNumberStyle: React.CSSProperties = {
  minWidth: "2.4em",
};

// Options here: https://github.com/react-syntax-highlighter/react-syntax-highlighter
const Code = (props: CodeProps) => {
  const {
    children: code = "",
    language,
    fileName,
    lineStart = 1,
    highlights = [],
    output,
  } = props;

  const hasFileName = fileName !== undefined && fileName !== "";
  const renderer = getRenderer(highlights);

  // Patch the style - remove margin
  a11yDark['pre[class*="language-"]'].margin = "0px";
  a11yDark['pre[class*="language-"]'].paddingTop = "20px";

  const topBar = (
    <div className="flex items-center justify-between p-1 pl-4">
      <span>{fileName}</span>
      <div className="flex gap-4 items-center">
        <span>{language}</span>
        <CopyButton code={code} />
      </div>
    </div>
  );

  return (
    <div className="card primary-container overflow-clip">
      {topBar}
      <SyntaxHighlighter
        language={language}
        style={a11yDark}
        lineNumberStyle={lineNumberStyle}
        showLineNumbers
        wrapLongLines
        wrapLines
        startingLineNumber={lineStart}
        renderer={renderer}
      >
        {code}
      </SyntaxHighlighter>
      {output && <CodeOutput output={output} />}
    </div>
  );
};

const CodeOutput = ({ output }: any) => {
  return (
    <div className="relative mt-2">
      <div className="overflow-hidden bg-white/[.08] text-white px-6 py-1 rounded-tl-lg rounded-br-lg font-mono text-sm absolute top-0 left-0">
        Output
      </div>
      <SyntaxHighlighter
        style={a11yDark}
        showLineNumbers
        wrapLongLines
        wrapLines
        lineNumberStyle={lineNumberStyle}
      >
        {output}
      </SyntaxHighlighter>
    </div>
  );
};

export default Code;
