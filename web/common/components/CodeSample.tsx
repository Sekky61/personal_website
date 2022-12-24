import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'; // css object

import CopyIcon from '@common/svg/CopyIcon';

// options here: https://github.com/react-syntax-highlighter/react-syntax-highlighter
export default function CodeSample(p: any) {
    const code = p.value.code.code;
    const lang = p.value.code.language;
    const fileName = p.value.fileName;

    // Patch the style - remove margin
    a11yDark['pre[class*="language-"]'].margin = '0px';

    return (
        <div>
            <div className='flex px-6'>
                <div className='bg-[#2B2B2B] px-2.5 py-1 rounded-t-lg'>
                    {fileName}
                </div>
            </div>
            <div className='relative'>
                <CopyButton code={code}></CopyButton>
                <SyntaxHighlighter language={lang} style={a11yDark} showLineNumbers wrapLongLines wrapLines>
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
        <button className={'absolute top-0 right-0 duration-100 bg-slate-400 hover:bg-white rounded-sm m-2 p-0.5 ' + (showCheck ? 'hover:bg-green-400' : '')}
            onClick={copyClicked} onMouseLeave={mouseLeave}>
            <CopyIcon showCheck={showCheck}></CopyIcon>
        </button>
    );
}
