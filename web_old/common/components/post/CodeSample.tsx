import { promises as fs } from "node:fs";
import type React from "react";

import "lsp-code-sample/style.css";

import { CodeSample, type CodeSampleObject, plain } from "lsp-code-sample";

// One piece of line styling information, eg. make line 5 a warning
export type Token = {
  type: "error" | "warning" | "info" | "highlight";
  line: number;
  message: string;
};

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
  codeSample?: CodeSampleObject;
}

type Path = string;

type LspCodeProps = {
  codeSample: CodeSampleObject | Path;
};

/** markdown blocks leave extra newline at the end */
export function MarkdownCode(props: CodeProps) {
  const { codeSample } = props;
  // Handle ordinary code from markdown
  const code =
    codeSample ??
    plain(props.children ?? "", {
      start_line: props.lineStart,
      file_name: props.fileName,
    });

  return (
    <div className="w-full max-w-full">
      <div>
        <CodeSample codeSample={code} />
      </div>
    </div>
  );
}

/**
 * markdown blocks leave extra newline at the end.
 * The path is relative to public folder.
 */
export async function LspCode(props: LspCodeProps) {
  console.log("rendered lspcode", props.codeSample);
  let codeSample: CodeSampleObject;
  if (typeof props.codeSample === "string") {
    const file = await fs.readFile(`public/${props.codeSample}`, "utf-8");
    codeSample = JSON.parse(file);
  } else {
    codeSample = props.codeSample;
  }

  return <CodeSample codeSample={codeSample} />;
}
