import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'; // css object

import { CopyIcon, CheckmarkIcon } from '@common/svg/CopyIcon';

type CodeSampleProps = {
    value: {
        fileName: string;
        code: {
            code: string;
            language: string;
        }
    }
}

// Options here: https://github.com/react-syntax-highlighter/react-syntax-highlighter
const CodeSample = ({ value }: CodeSampleProps) => {
    const { fileName, code: { code, language } } = value;

    // Patch the style - remove margin
    a11yDark['pre[class*="language-"]'].margin = '0px';

    return (
        <div>
            <div className='flex px-6'>
                <div className='bg-[#2B2B2B] text-white px-8 pt-1 rounded-t-lg font-mono'>
                    {fileName}
                </div>
            </div>
            <div className='relative'>
                <CopyButton code={code}></CopyButton>
                <SyntaxHighlighter language={language} style={a11yDark} showLineNumbers wrapLongLines wrapLines>
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
