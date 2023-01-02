import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'; // css object

import { CopyIcon, CheckmarkIcon } from '@common/svg/CopyIcon';

type CodeSampleProps = {
    value: {
        fileName: string;
        lineStart?: number;
        code: {
            code: string;
            language: string;
            highlightedLines: number[];
        }
    }
}

// Options here: https://github.com/react-syntax-highlighter/react-syntax-highlighter
const CodeSample = ({ value }: CodeSampleProps) => {
    const { fileName, lineStart, code: { code, language, highlightedLines } } = value;
    const hasFileName = fileName !== undefined && fileName !== null && fileName !== '';
    const startingLineNumber = lineStart !== undefined && lineStart !== null ? lineStart : 1;

    // Patch the style - remove margin
    a11yDark['pre[class*="language-"]'].margin = '0px';
    a11yDark['pre[class*="language-"]'].paddingTop = '40px';

    const lineProps = (lineNumber: number) => {
        let props: any = {};
        if (highlightedLines.includes(lineNumber)) {
            props.class = 'bg-lime-800 rounded';
        }
        return props;
    };

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
                    lineProps={lineProps}>
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
