import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/cjs/styles/prism"; // css object

import { getRenderer, Token } from "@common/utils/codeRendering";
import { CopyButton } from "../CopyButton";

interface CodeSampleProps {
	value: {
		fileName: string;
		lineStart?: number;
		tokens: Token[];
		output?: string;
		code: {
			code: string;
			language: string;
			highlightedLines: number[];
		};
	};
}

const lineNumberStyle: React.CSSProperties = {
	minWidth: "2.4em",
};

// Options here: https://github.com/react-syntax-highlighter/react-syntax-highlighter
const CodeSample = ({ value }: CodeSampleProps) => {
	const {
		fileName,
		lineStart,
		tokens,
		code: { code, language, highlightedLines = [] },
		output,
	} = value;
	const hasFileName =
		fileName !== undefined && fileName !== null && fileName !== "";
	const hasOutput = output !== undefined && output !== null && output !== "";
	const startingLineNumber =
		lineStart !== undefined && lineStart !== null ? lineStart : 1;
	const renderer = getRenderer(tokens, highlightedLines);

	// Patch the style - remove margin
	a11yDark['pre[class*="language-"]'].margin = "0px";
	a11yDark['pre[class*="language-"]'].paddingTop = "40px";

	return (
		<div>
			<div className="relative">
				{hasFileName && (
					<div className="overflow-hidden bg-white/[.08] text-white px-6 py-1 rounded-tl-lg rounded-br-lg font-mono text-sm absolute top-0 left-0">
						{fileName}
					</div>
				)}
				<CopyButton code={code}></CopyButton>
				<SyntaxHighlighter
					language={language}
					style={a11yDark}
					lineNumberStyle={lineNumberStyle}
					showLineNumbers
					wrapLongLines
					wrapLines
					startingLineNumber={startingLineNumber}
					renderer={renderer}
				>
					{code}
				</SyntaxHighlighter>
			</div>
			{hasOutput && <CodeOutput output={output}></CodeOutput>}
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

export default CodeSample;
