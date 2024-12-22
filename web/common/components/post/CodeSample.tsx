import type React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/cjs/styles/prism"; // css object

import { type Token, getRenderer } from "@common/codeRendering";
import { CopyButton } from "../CopyButton";
import { Pill } from "../Pill";

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

  const codeStyle = a11yDark;

  // Patch the style - remove margin
  codeStyle['pre[class*="language-"]'].margin = "0px";
  codeStyle['pre[class*="language-"]'].paddingTop = "60px";
  codeStyle['pre[class*="language-"]'].background =
    "var(--color-code-background)";
  console.log(codeStyle);

  const topBar = (
    <div className="absolute gap-3 inset-x-0 top-0 flex items-center p-3">
      {fileName && <Pill>{fileName}</Pill>}
      {language && <Pill>{language}</Pill>}
    </div>
  );

  return (
    <div className="card overflow-clip shape-large shadow-md shadow-primary/10 my-8 relative">
      {topBar}
      <SyntaxHighlighter
        language={language}
        style={codeStyle}
        lineNumberStyle={lineNumberStyle}
        showLineNumbers
        wrapLongLines
        wrapLines
        startingLineNumber={lineStart}
        renderer={renderer}
      >
        {code}
      </SyntaxHighlighter>
      <CopyButton
        className="absolute right-0 top-0 m-2 text-on-code-background"
        code={code}
      />
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
