import type React from "react";

import 'lsp-code-sample/style.css';

import { CodeSample, type CodeSampleObject, plain } from "lsp-code-sample";

// One piece of line styling information, eg. make line 5 a warning
export type Token = {
  type: 'error' | 'warning' | 'info' | 'highlight';
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

/** markdown blocks leave extra newline at the end */
export function Code(props: CodeProps) {
  const { codeSample } = props;
  // Handle ordinary code from markdown
  const code = codeSample ?? plain(props.children ?? "", {
    start_line: props.lineStart,
    file_name: props.fileName
  });

  return <CodeSample codeSample={code} />;
}

