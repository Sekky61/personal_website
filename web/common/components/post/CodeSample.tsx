import React, { useState } from 'react';
import { createElement, Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'; // css object

import { CopyIcon, CheckmarkIcon } from '@common/svg/CopyIcon';

type TokenType = 'error' | 'warning' | 'info';

type Token = {
    type: TokenType;
    line: number;
    message: string;
}

type CodeSampleProps = {
    value: {
        fileName: string;
        lineStart?: number;
        tokens: Token[];
        code: {
            code: string;
            language: string;
            highlightedLines: number[];
        }
    }
}

const lineStyle = {
    highlighted: {
        line: ['bg-lime-700/30', 'rounded'],
        text: ['token-message', `highlight-token`]
    },
    error: {
        line: ['bg-red-700/25', 'rounded'],
        text: ['token-message', `error-token`]
    },
    warning: {
        line: ['bg-yellow-700/25', 'rounded'],
        text: ['token-message', `warning-token`]
    },
    info: {
        line: ['bg-blue-700/25', 'rounded'],
        text: ['token-message', `info-token`]
    },
};

function rowRenderer({ row, stylesheet, useInlineStyles, rowNumber, tokens, highlightedLines }: any) {
    // find if there is a token for this line
    const token = tokens.find((t: any) => t.line === rowNumber);
    if (token) {
        const tokenType = token.type as TokenType;
        const style = lineStyle[tokenType];
        row.properties.className = style.line;
        row.children.push({
            type: 'element',
            tagName: 'span',
            properties: {
                className: style.text
            },
            children: [
                {
                    type: 'text',
                    value: token.message
                }
            ]
        });
    } else if (highlightedLines.includes(rowNumber)) {
        row.properties.className = lineStyle.highlighted.line;
    } else {
        // It needs to be reset
        row.properties.className = [];
    }

    let rowElement = createElement({
        node: row,
        stylesheet,
        useInlineStyles,
        key: rowNumber,
    });

    return rowElement;
}

function createRendererWithContext(tokens: Token[], highlightedLines: number[]) {
    return ({ rows, stylesheet, useInlineStyles }: any) => {
        const renderedLines = rows.map((row: any, number: number) => {
            const lineNumber = number + 1;
            return rowRenderer({ row, stylesheet, useInlineStyles, rowNumber: lineNumber, tokens, highlightedLines })
        })

        return <div>{renderedLines}</div>
    }
}

// Options here: https://github.com/react-syntax-highlighter/react-syntax-highlighter
const CodeSample = ({ value }: CodeSampleProps) => {
    const { fileName, lineStart, tokens, code: { code, language, highlightedLines = [] } } = value;
    const hasFileName = fileName !== undefined && fileName !== null && fileName !== '';
    const startingLineNumber = lineStart !== undefined && lineStart !== null ? lineStart : 1;

    // Patch the style - remove margin
    a11yDark['pre[class*="language-"]'].margin = '0px';
    a11yDark['pre[class*="language-"]'].paddingTop = '40px';

    const renderer = createRendererWithContext(tokens, highlightedLines);

    return (
        <div>
            <div className='relative'>
                {hasFileName &&
                    <div className='overflow-hidden bg-white/[.08] text-white px-6 py-1 rounded-tl-lg rounded-br-lg font-mono text-sm absolute top-0 left-0'>
                        {fileName}
                    </div>
                }
                <CopyButton code={code}></CopyButton>
                <SyntaxHighlighter language={language} style={a11yDark} showLineNumbers wrapLongLines wrapLines startingLineNumber={startingLineNumber}
                    renderer={renderer}>
                    {code}
                </SyntaxHighlighter>
            </div>
        </div>
    );
};

const CopyButton = ({ code }: any) => {
    const [showCheck, setShowCheck] = useState(false);
    const copyClicked = () => {
        navigator.clipboard.writeText(code);
        setShowCheck(true);
    }
    const mouseLeave = () => {
        setShowCheck(false);
    }

    return (
        <button className={'absolute top-0 right-0 m-2 p-0.5 duration-100 bg-slate-500 rounded-sm ' + (showCheck ? 'hover:bg-green-400' : 'hover:bg-primary-200')}
            onClick={copyClicked} onMouseLeave={mouseLeave}>
            {
                showCheck ?
                    <CheckmarkIcon></CheckmarkIcon>
                    :
                    <CopyIcon></CopyIcon>
            }
        </button>
    );
}

export default CodeSample;
